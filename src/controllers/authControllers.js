const config = require("../config/config").development;
const authService = require("../services/authService");
const userService = require("../services/userService");
const { generateToken, decryptToken } = require("../services/tokenService");
const bcrypt = require("bcrypt");
const { EmailSendgrid } = require("../services/sendgrid");
const { uploadImageService } = require("../services/upliadImages");

const forbiddenMsg = (res, msg) => {
  return res.status(401).json(msg);
};

const loginController = (req, res, next) => {
  const { email, password } = req.body;
  const reqPassword = password;
  authService
    .findUserByEmail(email)

    .then(userFound => {
      userFound
        ? bcrypt
            .compare(reqPassword, userFound.password)
            .then(passwordMatch => {
              passwordMatch
                ? res.status(200).json({
                    token: generateToken(userFound),
                    user: {
                      id: userFound.id,
                      email: userFound.email,
                      firstName: userFound.firstName,
                      lastName: userFound.lastName,
                      image: userFound.image,
                      isAdmin: userFound.roleId === 1,
                    },
                  })
                : forbiddenMsg(
                    res,
                    "Failed in authentication, wrong email or password"
                  );
            })
        : forbiddenMsg(
            res,
            "Failed in authentication, wrong email or password"
          );
    })
    .catch(error => next(error));
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const { image } = req.files;

  try {
    const imageName = Date.now() + "_" + image?.name;
    const imageUploadedPath = await uploadImageService(image, imageName);

    const userUpdated = await userService.update(id, {
      firstName,
      lastName,
      image: `${config.basePath}/static/${imageName}`,
    });
    res.status(200).json({
      token: generateToken(userUpdated),
      user: {
        id: userUpdated.id,
        firstName: userUpdated.firstName,
        lastName: userUpdated.lastName,
        email: userUpdated.email,
        image: userUpdated.image,
        isAdmin: userUpdated.roleId === 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const registerController = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = { firstName, lastName, email, password };
  try {
    const userCreated = await userService.save(newUser);

    const responseRegister = await authService
      .findUserByEmail(newUser.email)
      .then(userFound => {
        console.log(userFound);
        return {
          id: userFound.id,
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          email: userFound.email,
          image: userFound.image,
          roleId: userFound.roleId,
          token: generateToken(userFound),
        };
      });
    EmailSendgrid(
      userCreated.email,
      "Bienvenido a nuestra plataforma",
      "la vas a pasar",
      "<strong> MUY BIEN </strong>"
    );

    res.status(201).json(responseRegister);
  } catch (error) {
    next(error);
  }
};

const tokenController = (req, res, next) => {
  const { id } = req.data;
  id &&
    authService
      .findUserById(id)
      .then(userFound => {
        userFound
          ? res.status(200).json({
              id: userFound.id,
              firstName: userFound.firstName,
              lastName: userFound.lastName,
              email: userFound.email,
              image: userFound.image,
              isAdmin: userFound.roleId === 1,
            })
          : forbiddenError(res, "Failed in token authentication");
      })
      .catch(error => next(error));
};

module.exports = {
  loginController,
  tokenController,
  registerController,
  updateUser,
};
