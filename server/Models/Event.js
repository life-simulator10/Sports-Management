import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, require: true },
    eventImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    desc: { type: String, require: true },
    createdAt: { type: Date, default: Date.now }
})

export const Event = mongoose.model("Event", eventSchema);