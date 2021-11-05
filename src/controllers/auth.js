const bcrypt = require("bcrypt");
const { User } = require("../db");

const registerController = async (req, res) => {
  const { userName, email, password } = req.body;

  const saltRounds = 10;

  let newUser = {
    userName,
    email,
    password: bcrypt.hashSync(password.toString(), saltRounds),
  };

  try {
    const user = await User.create(newUser);
    await user.save();
    return res.status(201).json("register success");
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      ok: false,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(403).json("Datos incorrectos, intente nuevamente");
    }

    let userCompare = bcrypt.compareSync(password.toString(), user.password);

    if (!userCompare) {
      return res.status(403).json("Datos incorrectos, intente nuevamente");
    }
    return res.status(200).json({
      message: "Exitoso",
      userInfo: {
        userName: user.userName,
        email: user.email,
        favorites_artists: user.favorites_artist,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error del servidor");
  }
};

module.exports = { registerController, loginController };
