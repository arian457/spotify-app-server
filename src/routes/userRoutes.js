const { Router } = require('express');
const { registerController, loginController, refreshSession } = require('../controllers/auth');
const { registerValidations, loginValidations } = require('../middlewares/auth');
const { tokenExists } = require('../middlewares/token');
const router = Router();


router.post("/register", registerValidations, registerController)
router.post("/login", loginValidations, loginController)
router.post("/me", tokenExists, refreshSession)

module.exports = router;
