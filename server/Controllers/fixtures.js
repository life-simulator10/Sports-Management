import { Fixtures } from "../Models/Fixtures.js";

//creating a fixture
export const addFixture = async (req, res) => {
    const { eventName, teamOne, teamTwo, venue, date, time } = req.body;
    try {
        let fixture = await Fixtures.create({ eventName, teamOne, teamTwo, venue, date, time });
        res.status(201).json({ message: "Fixture created successfully!", fixture, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//updating a fixture 
export const updateFixture = async (req, res) => {
    const id = req.params.id; // Fixture ID to update
    const { eventName, teamOne, teamTwo, venue, date, time } = req.body; // Updated fields

    try {
        // Find the fixture by ID and update the fields
        let fixture = await Fixtures.findByIdAndUpdate(
            id, // The ID of the fixture to update
            { eventName, teamOne, teamTwo, venue, date, time }, // The fields to update
            { new: true } // Return the updated document
        );

        if (!fixture) {
            return res.status(404).json({ message: "Fixture not found...", success: false });
        }

        res.json({ message: "Fixture updated successfully...!", fixture, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

//deleting a fixture
export const deleteFixture = async (req, res) => {
    const id = req.params.id; // Fixture ID to delete

    try {
        // Find the fixture by ID and delete it
        let fixture = await Fixtures.findByIdAndDelete(id);

        if (!fixture) {
            return res.status(404).json({ message: "Fixture not found...", success: false });
        }

        res.json({ message: "Fixture deleted successfully...!", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

//get all the fixtures
export const getAllFixtures = async (req, res) => {
    try {
        // Retrieve all fixtures from the database
        const fixtures = await Fixtures.find();

        if (!fixtures || fixtures.length === 0) {
            return res.status(404).json({ message: "No fixtures found...", success: false });
        }

        res.json({ message: "Fixtures retrieved successfully...!", fixtures, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}