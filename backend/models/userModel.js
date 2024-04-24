const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        pic: {
            type: String,
            required: true,
            default: "https://github.com/sayanghoshofficial/NodeZiper/assets/99132893/66485cb1-0a16-4dc4-b6cc-f30dc7000e9f"
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (entredPassword) {
    return await bcrypt.compare(entredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;