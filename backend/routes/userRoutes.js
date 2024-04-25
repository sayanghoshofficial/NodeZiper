const express = require("express");
const { registerUser, authUser, updateProfile } = require("../controller/userController");
const protect = require("../middlewere/authMiddlewere");

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(protect, updateProfile)



module.exports = router;