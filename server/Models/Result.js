import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    teamOne: { type: String, required: true },
    scoreOne: { type: String, required: true },
    imageOne: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    teamTwo: { type: String, required: true },
    imageTwo: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    scoreTwo: { type: String, required: true },
    summary: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: String, default: "-", required: true },
    time: { type: String, default: "-", required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Result = mongoose.model("Result", resultSchema);
