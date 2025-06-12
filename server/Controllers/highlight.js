import { Highlight } from "../Models/Highlights.js";

// Controller to add a highlight
export const addHighlight = async (req, res) => {
    const { teamOne, teamTwo, link } = req.body;

    try {
        const newHighlight = new Highlight({
            teamOne,
            teamTwo,
            link
        });

        const savedHighlight = await newHighlight.save();

        res.status(201).json({
            success: true,
            data: savedHighlight,
            message: 'Highlight added successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Controller to get all highlights
export const getAllHits = async (req, res) => {
    try {
        const highlights = await Highlight.find();

        if (!highlights.length) {
            return res.status(404).json({
                success: false,
                message: "No highlights found"
            });
        }

        res.status(200).json({
            success: true,
            data: highlights,
            message: "Highlights fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export const getLatestHighlight = async (req, res) => {
    try {
        // Fetch the latest highlight, sorted by the createdAt field in descending order
        const latestHighlight = await Highlight.findOne().sort({ createdAt: -1 });

        // If no highlight found, return a 404 response
        if (!latestHighlight) {
            return res.status(404).json({
                success: false,
                message: "No highlights found"
            });
        }

        // Send success response with the latest highlight
        res.status(200).json({
            success: true,
            data: latestHighlight,
            message: "Latest highlight fetched successfully"
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Send error response
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

