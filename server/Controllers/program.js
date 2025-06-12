import { Program } from "../Models/Program.js";

// Add a new program
export const addProgram = async (req, res) => {
    const { ProgramName, Date, ImageLink, Description, Link } = req.body;

    try {
        const newProgram = new Program({
            ProgramName,
            Date,
            ImageLink,
            Description,
            Link
        });
        await newProgram.save();
        res.status(201).json({ message: "Program added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding program", error });
    }
};

// Get all programs
export const getAllProgram = async (req, res) => {
    try {
        const programs = await Program.find();
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching programs", error });
    }
};

// Update a program
export const updateProgram = async (req, res) => {
    const { id } = req.params;
    const { ProgramName, Date, ImageLink, Description, Link } = req.body;

    try {
        const updatedProgram = await Program.findByIdAndUpdate(
            id,
            { ProgramName, Date, ImageLink, Description, Link },
            { new: true }
        );
        if (!updatedProgram) return res.status(404).json({ message: "Program not found" });
        res.status(200).json({ message: "Program updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error updating program", error });
    }
};

// Delete a program
export const deleteProgram = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProgram = await Program.findByIdAndDelete(id);
        if (!deletedProgram) return res.status(404).json({ message: "Program not found" });
        res.status(200).json({ message: "Program deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting program", error });
    }
};
