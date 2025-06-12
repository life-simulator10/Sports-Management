import mongoose from "mongoose";

const fixturesSchema = new mongoose.Schema({
    eventName: { type: String, require: true },
    teamOne: { type: String, require: true },
    teamTwo: { type: String, require: true },
    venue: { type: String, require: true },
    date: { type: String, default: "-", require: true },
    time: { type: String, default: "-", require: true },
    createdAt: { type: Date, default: Date.now }
});

export const Fixtures = mongoose.model("Fixtures", fixturesSchema);
