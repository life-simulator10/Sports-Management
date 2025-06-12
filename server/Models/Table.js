import mongoose from "mongoose";

const teamResultSchema = new mongoose.Schema({
    team: { type: String, required: true },
    played: { type: Number, required: true, default: 0 },
    win: { type: Number, required: true, default: 0 },
    draw: { type: Number, required: true, default: 0 },
    loss: { type: Number, required: true, default: 0 },
    points: { type: Number, required: true, default: 0 },
    nrr: { type: String, required: true, default: 0 }
});


const tableSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        require: true
    },
    record: [teamResultSchema]
});

export const Table = mongoose.model("Table", tableSchema);