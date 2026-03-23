const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");

const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(200).json(null);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified?.userId) {
            return res.status(200).json(null);
        }

        const user = await User.findById(verified.userId).select("-password");
        if (!user) {
            return res.status(200).json(null);
        }

        return res.status(200).json(user);
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(200).json(null);
        }
        return res.status(500).json({ message: `getCurrentUser error ${error}` });
    }
}

module.exports = getCurrentUser