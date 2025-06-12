import mongoose from 'mongoose';

// Define the message schema
const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                // Simple email validation regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    phoneNo: {
        type: Number,
        required: true,
        validate: {
            validator: function (num) {
                return num.toString().length >= 7 && num.toString().length <= 15;
            },
            message: 'Phone number must be between 7 and 15 digits.',
        },
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Message = mongoose.model("Message", messageSchema);