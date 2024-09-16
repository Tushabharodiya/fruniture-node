const User = require("../models/user.model");
const bcrypt = require('bcryptjs');





let userRegister = async (req, res) => {
    try {
        let body = req.body;
        let { firstname, lastname, email, phone, password, confirmpassword } = req.body;
        let findUser = await User.findOne({ email: email })

        if (findUser) {
            return res.status(401).json({ message: "you are alreay register" });
        }
        if (!firstname || !lastname || !email || !phone || !password || !confirmpassword) {
            return res.status(401).json({ message: "all filed are required" });
        }
        if (firstname.length <= 3 || lastname.length <= 3) {
            return res.status(401).json({ message: "Firstname or lastname must be at least 4 characters long" });
        }

        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(401).json({
                message: "Password must be at least 6 characters long and contain at least one special character"
            });
        }
        if (password !== confirmpassword) {
            return res.status(401).json({ message: "password invalid ! " });
        }
        const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds (default is 10)
        const hashedPassword = await bcrypt.hash(password, salt);

        body.password = hashedPassword;
        body.confirmpassword = hashedPassword;

        let user = await User.create(body);
        res.status(201).json({
            message: "user register success ",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { userRegister }