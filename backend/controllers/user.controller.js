const User = require("../model/user.model.js");


const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password");
        if(!user) {
            res.status(400).json({message: "user doesn't found"});
        }

        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({message: `getCurrentUser error ${error}`});
    }
}


module.exports = getCurrentUser