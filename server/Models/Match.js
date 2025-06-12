import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    eventName: { type: String, require: true },
    teamOne: { type: String, require: true },
    imageOne: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    teamTwo: { type: String, require: true },
    imageTwo: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    venue: { type: String, require: true },
    date: { type: String, default: "-", require: true },
    time: { type: String, default: "-", require: true },
    createdAt: { type: Date, default: Date.now }
});

export const Match = mongoose.model("Match", matchSchema);
