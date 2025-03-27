const { signupValidation,loginValidation } = require('../controllers/AuthValiation');
const { signup,login } = require('../controllers/AuthController');
const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
module.exports=router;