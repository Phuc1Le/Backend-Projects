const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password required"
            });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await userModel.createUser(email, passwordHash);
        res.status(201).json(user);
    } catch (error) {
        if(error.code === "23505"){
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        console.error(error);
        res.status(500).json({
            message:
                "Internal server error"
        });
    }
}
const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message:
                    "Email and password required"
            });
        }
        const user = await userModel.findByEmail(email)
        if (!user) {
            return res.status(401).json({
                message:
                    "Email not found"
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if(!passwordMatch){
            return res.status(401).json({
                message:
                    "Wrong email or password"
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )
        res.json(token)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                "Internal server error"
        });
    }
}
module.exports = {
    register,
    login,
}