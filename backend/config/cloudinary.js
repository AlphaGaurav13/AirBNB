const v2 = require("cloudinary")
const fs = require("fs")



const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_CLOUD_KEY,
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET
    })
    try {
        if(!filePath) {
            return null
        }

        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath);

        return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(filePath);
        console.log(error);
    }
}


export default uploadOnCloudinary