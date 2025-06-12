import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    imageLink: {
        type: String,
        required: true  // The link to the image is required
    },
    description: {
        type: String,
        required: true  // Description is also required
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set the current date if not provided
    }
});

export const Gallery = mongoose.model("Gallery", gallerySchema);
