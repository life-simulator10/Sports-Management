// Importing mongoose
import mongoose from 'mongoose';

// Defining the News schema
const newsSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageLink: {
        type: String,  // URL type is stored as String
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set the creation date
    }
});

// Creating the News model
export const News = mongoose.model('News', newsSchema);