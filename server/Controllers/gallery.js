import { Gallery } from "../Models/Gallery.js";

// Add a new gallery entry
export const addGallery = async (req, res) => {
    const { imageLink, description } = req.body;
    try {
        let gallery = await Gallery.create({ imageLink, description });
        res.status(201).json({ message: "Gallery item created successfully!", gallery, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a gallery entry by ID
export const deleteGallery = async (req, res) => {
    const { id } = req.params;
    try {
        let gallery = await Gallery.findByIdAndDelete(id);
        if (!gallery) {
            return res.status(404).json({ message: "Gallery item not found!", success: false });
        }
        res.status(200).json({ message: "Gallery item deleted successfully!", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all gallery entries
export const getAllGallery = async (req, res) => {
    try {
        let galleries = await Gallery.find().sort({ createdAt: -1 });  // Sort by newest first
        res.status(200).json({ message: "Galleries fetched successfully!", galleries, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
