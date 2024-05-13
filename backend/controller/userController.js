const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateTokens");
const logger = require("./logger")


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        logger.userLogger.log('error',`${req?.body?.email} user already exists`)
        throw new Error("User Already Exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
        logger.userLogger.log('info',`${user.email} successfully created new user`)
    } else {
        logger.userLogger.log('error',`error occur during creating new user`)
        res.status(400);
        throw new Error("Error Occured!")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
        logger.userLogger.log('info',`${user.email} successfully authenticate`)
    } else {
        logger.userLogger.log('error',`error occur during authenticate`)
        res.status(400);
        throw new Error("Invalid email or Password!")
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic

        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save();
    
        res.json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            pic:updatedUser.pic,
            token: generateToken(updatedUser._id)
        })
        logger.userLogger.log('info',`${updatedUser.email} successfully update`)
    } else{
        logger.userLogger.log('error',`error occur during update user`)
        res.status(404);
        throw new Error("User Not Found!");
    }
})

module.exports = { registerUser, authUser, updateProfile }