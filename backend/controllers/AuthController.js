const bcrypt = require('bcrypt');
const UserModel = require("../models/user");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User already exists, please log in.', 
                success: false 
            });
        }

        // Hash password before saving
        const newUser = new UserModel({ name, email, password});
         newUser.password = await bcrypt.hash(password, 10);

        await newUser.save();
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ 
                message: 'Authentication failed or wrong password', 
                success: false 
            });
        }

        // Compare passwords
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ 
                message: 'Authentication failed or wrong password', 
                success: false 
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Fixed spelling error
        );

        // Send response
        res.status(200).json({ 
            message: "Login successful", 
            success: true, 
            jwtToken, 
            email, 
            name: user.name 
        })
    } 
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports = {signup, login};
