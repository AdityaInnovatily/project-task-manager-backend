const { registerUser, login, updateUser } = require("./userService");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router = require("express").Router();


router.post('/register', registerUser);
router.get('/login',login);
router.post('/updateUser',updateUser);


module.exports = router;