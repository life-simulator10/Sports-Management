import { Result } from "../Models/Result.js";
import cloudinary from "cloudinary";

// Creating a result
export const addResult = async (req, res) => {
    const { eventName, teamOne, imageOne, scoreOne, teamTwo, imageTwo, scoreTwo, summary, venue, date, time } = req.body;
    try {
        // Upload imageOne
        const resultOne = await cloudinary.uploader.upload(imageOne, {
            folder: "Result"
        });

        // Upload imageTwo
        const resultTwo = await cloudinary.uploader.upload(imageTwo, {
            folder: "Result"
        });

        // Create the new result entry
        let newResult = await Result.create({
            eventName,
            teamOne,
            scoreOne,
            imageOne: { public_id: resultOne.public_id, url: resultOne.secure_url },
            teamTwo,
            scoreTwo,
            imageTwo: { public_id: resultTwo.public_id, url: resultTwo.secure_url },
            summary,
            venue,
            date,
            time
        });

        res.status(201).json({ message: "Result created successfully!", newResult, success: true });
    } catch (error) {
        console.error('Error creating result:', error);
        res.status(500).json({ message: error.message, success: false });
    }
};


export const updateResult = async (req, res) => {
    const { id } = req.params;
    const { eventName, teamOne, scoreOne, imageOne, teamTwo, scoreTwo, imageTwo, summary, venue, date, time } = req.body;

    try {
        let updateFields = {
            eventName,
            teamOne,
            scoreOne,
            teamTwo,
            scoreTwo,
            summary,
            venue,
            date,
            time
        };

        // Upload and update imageOne if provided
        if (imageOne) {
            const resultOne = await cloudinary.uploader.upload(imageOne, { folder: "Results" });
            updateFields.imageOne = { public_id: resultOne.public_id, url: resultOne.secure_url };
        }

        // Upload and update imageTwo if provided
        if (imageTwo) {
            const resultTwo = await cloudinary.uploader.upload(imageTwo, { folder: "Results" });
            updateFields.imageTwo = { public_id: resultTwo.public_id, url: resultTwo.secure_url };
        }

        const updatedResult = await Result.findByIdAndUpdate(id, updateFields, { new: true });

        res.status(200).json({ message: "Result updated successfully!", updatedResult, success: true });
    } catch (error) {
        console.error('Error updating result:', error);
        res.status(500).json({ message: error.message });
    }
};




export const deleteResult = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Result.findById(id);

        if (!result) {
            return res.status(404).json({ message: "Result not found", success: false });
        }

        // Delete images from Cloudinary
        if (result.imageOne.public_id) {
            await cloudinary.uploader.destroy(result.imageOne.public_id);
        }
        if (result.imageTwo.public_id) {
            await cloudinary.uploader.destroy(result.imageTwo.public_id);
        }

        await Result.findByIdAndDelete(id);

        res.status(200).json({ message: "Result deleted successfully!", success: true });
    } catch (error) {
        console.error('Error deleting result:', error);
        res.status(500).json({ message: error.message });
    }
};



export const getAllResults = async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).json({ results, success: true });
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getLatestResults = async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 }).limit(2);
        res.status(200).json({ results, success: true });
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: error.message });
    }
};
