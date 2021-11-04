const { check } = require("express-validator");
const { customValidationResult: checkValidations } = require("./commons");
const authService = require("../services/authService");
const {decryptToken} = require('../services/tokenService')

// VALIDACIONES
const _validEmail = check("email", "El campo email es invalido").isEmail();
const _requiredEmail = check("email", "El campo email es requerido").notEmpty();
const _requiredFirstName = check(
  "firstName",
  "El campo firstname es requerido"
).notEmpty();
const _requiredLastName = check(
  "lastName",
  "El campo lastname es requerido"
).notEmpty();
const _requiredPassword = check(
  "password",
  "El campo password es requerido"
).notEmpty();
const _uniqueEmail = check("email").custom(async (email) => {
  const user = await authService.findUserByEmail(email);

  if (user) {
    throw new Error(
      "El campo email ya esta en uso. Por favor intente con otra dirección de correo electrónico diferente");
  }
});

const isAdmin = (req, res, next) => {
  const { roleId } = req.data;

  if (roleId === 1) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Acceso no autorizado (solo admin)" });
  }
};

// Grupos de validaciones
const loginValidations = [
  _validEmail,
  _requiredEmail,
  _requiredPassword,
  checkValidations,
];

const registerValidations = [
  _requiredEmail,
  _validEmail,
  _uniqueEmail,
  _requiredFirstName,
  _requiredLastName,
  _requiredPassword,
  checkValidations,
];

module.exports = { loginValidations, registerValidations, isAdmin };
