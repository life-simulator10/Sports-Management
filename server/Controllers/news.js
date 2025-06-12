import { News } from '../Models/News.js';

// Controller to add a news item
export const addNews = async (req, res) => {
    const { source, title, description, imageLink } = req.body;

    try {
        const newNews = new News({
            source,
            title,
            description,
            imageLink
        });

        const savedNews = await newNews.save();

        res.status(201).json({
            success: true,
            data: savedNews,
            message: 'News added successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Controller to get all news items
export const getAllNews = async (req, res) => {
    try {
        const newsItems = await News.find();

        if (!newsItems.length) {
            return res.status(404).json({
                success: false,
                message: "No news items found"
            });
        }

        res.status(200).json({
            success: true,
            data: newsItems,
            message: "News items fetched successfully"
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

// Controller to get the latest 3 news items
export const getLatestNews = async (req, res) => {
    try {
        // Fetch the latest 3 news items, sorted by the createdAt field in descending order
        const latestNews = await News.find().sort({ createdAt: -1 }).limit(3);

        // If no news items found, return a 404 response
        if (!latestNews.length) {
            return res.status(404).json({
                success: false,
                message: "No news items found"
            });
        }

        // Send success response with the latest news
        res.status(200).json({
            success: true,
            data: latestNews,
            message: "Latest news items fetched successfully"
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

// Controller to fetch individual news item by ID
export const getNewsById = async (req, res) => {
    const { id } = req.params;  // Extracting the id from request params

    try {
        const newsItem = await News.findById(id);  // Finding the news item by ID

        if (!newsItem) {
            return res.status(404).json({
                success: false,
                message: "News item not found"
            });
        }

        res.status(200).json({
            success: true,
            data: newsItem,
            message: "News item fetched successfully"
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