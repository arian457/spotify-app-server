const { Router } = require('express');
const { registerController, loginController } = require('../controllers/auth');
const { registerValidations, loginValidations } = require('../middlewares/auth');
const router = Router();


router.post("/register", registerValidations, registerController)
router.post("/login", loginValidations, loginController)

module.exports = router;
