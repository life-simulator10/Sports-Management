import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    ProgramName: { type: String, required: true },
    Date: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    ImageLink: {
        url: { type: String, required: true }
    },
    Description: { type: String, required: true },
    Link: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Program = mongoose.model("Program", programSchema);
