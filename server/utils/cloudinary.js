import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

console.log('Cloudinary Config:', process.env.CLOUD_NAME, process.env.CLOUD_KEY, process.env.CLOUD_KEY_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
});

export default cloudinary;
