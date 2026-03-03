const genToken = require("../config/token.js");
const User = require("../model/user.model.js");
const bcrypt = require("bcryptjs")
const  signUp = async (req, res) => {
    try {
        let {name, email, password} = req.body;
        let existUser = await User.findOne({email});
        if(existUser) {
            return res.status(400).json({msg: "User Already Created"});
        }

        let hashPassword = await bcrypt.hash(password, 10);
        let user = await User.create({
            name, 
            email, 
            password:hashPassword
        });
        
        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT = "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json(user);
    } catch(error) {
        return res.status(500).json({message: `signup error ${error}`});
    }
}

const login = async (req, res) => {
    try {
        let {email, password} = req.body;
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "User do not exist"});
        }
        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: "Incorrect Password"});
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT = "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user);
    } catch(error) {
        return res.status(500).json({message: `login error ${error}`})
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "Logout Successfully"});
    } catch(error) {
        return res.status(500).json({message: `Logout error ${error}`});
    }
}

module.exports = { signUp, login, logOut };