const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});


const uploadToCloudinary = async (localPath) => {
    try {
        if(!localPath) {
            console.log('Local Path Is Missing from uploadToCloudinary');
            return null
        }

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto'
        })
        return response;

    } catch (error) {
        fs.unlinkSync(localPath);
        return null;
    }
};

module.exports = uploadToCloudinary;
