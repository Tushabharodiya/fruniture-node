let mongoose = require("mongoose")


let userSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
    },
    confirmpassword: {
        type: String,
    },
}, { timestamps: true })

let User = mongoose.model("users", userSchema)

module.exports = User;