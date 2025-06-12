import mongoose from "mongoose";
const hitSchema = new mongoose.Schema({
    teamOne: {
        type: String,
        required: true
    },
    teamTwo: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now }
});
export const Highlight = mongoose.model("Highlight", hitSchema);
