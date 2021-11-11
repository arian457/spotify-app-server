const { check, validationResult } = require("express-validator");
const { User } = require("../db")

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = {
      message: "Validation error",
      status: 400,
      detail: errors.errors,
    };

   return res.status(400).json(error);
  }


  next();
};
// VALIDACIONES
const _validEmail = check("email", "El campo email es invalido").isEmail();
const _requiredEmail = check("email", "El campo email es requerido").notEmpty();
const _requiredFirstName = check(
  "userName",
  "El campo username es requerido"
).notEmpty();
const _requiredPassword = check(
  "password",
  "El campo password es requerido"
).notEmpty();
const _uniqueEmail = check("email").custom(async (email) => {
  const user = await User.findOne({where:{email}});

  if (user) {
    throw new Error(
      "El campo email ya esta en uso. Por favor intente con otra dirección de correo electrónico diferente"
    );
  }
});

// Grupos de validaciones
const loginValidations = [
  _requiredPassword,
  checkValidations,
];

const registerValidations = [
  _requiredEmail,
  _validEmail,
  _uniqueEmail,
  _requiredFirstName,
  _requiredPassword,
  checkValidations,
];

module.exports = { loginValidations, registerValidations };
