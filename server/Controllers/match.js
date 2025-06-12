import { Match } from "../Models/Match.js";
import cloudinary from '../utils/cloudinary.js';


export const addMatch = async (req, res) => {
    const { eventName, teamOne, imageOne, teamTwo, imageTwo, venue, date, time } = req.body;
    try {
        // Upload imageOne
        const resultOne = await cloudinary.uploader.upload(imageOne, {
            folder: "Match"
        });

        // Upload imageTwo
        const resultTwo = await cloudinary.uploader.upload(imageTwo, {
            folder: "Match"
        });

        let Matches = await Match.create({
            eventName,
            teamOne,
            imageOne: { public_id: resultOne.public_id, url: resultOne.secure_url },
            teamTwo,
            imageTwo: { public_id: resultTwo.public_id, url: resultTwo.secure_url },
            venue,
            date,
            time
        });

        res.status(201).json({ message: "Match created successfully!", Matches, success: true });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json({ matches, success: true });
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateMatch = async (req, res) => {
    const { id } = req.params;
    const { eventName, teamOne, imageOne, teamTwo, imageTwo, venue, date, time } = req.body;

    try {
        let updateFields = {
            eventName,
            teamOne,
            teamTwo,
            venue,
            date,
            time
        };

        // Upload and update imageOne if provided
        if (imageOne) {
            const resultOne = await cloudinary.uploader.upload(imageOne, { folder: "Match" });
            updateFields.imageOne = { public_id: resultOne.public_id, url: resultOne.secure_url };
        }

        // Upload and update imageTwo if provided
        if (imageTwo) {
            const resultTwo = await cloudinary.uploader.upload(imageTwo, { folder: "Match" });
            updateFields.imageTwo = { public_id: resultTwo.public_id, url: resultTwo.secure_url };
        }

        const updatedMatch = await Match.findByIdAndUpdate(id, updateFields, { new: true });

        res.status(200).json({ message: "Match updated successfully!", updatedMatch, success: true });
    } catch (error) {
        console.error('Error updating match:', error);
        res.status(500).json({ message: error.message });
    }
};


export const deleteMatch = async (req, res) => {
    const { id } = req.params;

    try {
        const match = await Match.findById(id);

        if (!match) {
            return res.status(404).json({ message: "Match not found", success: false });
        }

        // Delete images from Cloudinary
        if (match.imageOne.public_id) {
            await cloudinary.uploader.destroy(match.imageOne.public_id);
        }
        if (match.imageTwo.public_id) {
            await cloudinary.uploader.destroy(match.imageTwo.public_id);
        }

        await Match.findByIdAndDelete(id);

        res.status(200).json({ message: "Match deleted successfully!", success: true });
    } catch (error) {
        console.error('Error deleting match:', error);
        res.status(500).json({ message: error.message });
    }
};
