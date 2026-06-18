const cloudinaryClient = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
    console.warn('Cloudinary is not fully configured: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET if image uploads are required.')
}

cloudinaryClient.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
})

const cloudinaryStorageInstance = new CloudinaryStorage({
    cloudinary: cloudinaryClient,
    params: {
        folder: "apod_gallery",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [{ width: 1920, crop: "limit" }]
    }
})

const imageUpload = multer({ storage: cloudinaryStorageInstance })

module.exports = { cloudinary: cloudinaryClient, upload: imageUpload }
