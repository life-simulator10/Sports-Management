import { Table } from "../Models/Table.js";

export const addToTable = async (req, res) => {
    const { eventId, team, played, win, draw, loss, points, nrr } = req.body;

    try {
        // Find the table by eventId and update by pushing a new record into the array
        let table = await Table.findOneAndUpdate(
            { eventId }, // Find the document with the matching eventId
            {
                $push: {
                    record: { team, played, win, draw, loss, points, nrr }
                }
            },
            { new: true, upsert: true } // 'new' returns the updated document, 'upsert' creates a new document if none is found
        );

        res.json({ message: 'Record added to table', table });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

export const deleteFromTable = async (req, res) => {
    const recordId = req.params.id; // Record ID to delete

    try {
        // Find the document that contains the record and remove the record by its ID
        let table = await Table.findOneAndUpdate(
            { "record._id": recordId }, // Find the document containing the record with this ID
            { $pull: { record: { _id: recordId } } }, // Remove the record from the array
            { new: true } // Return the updated document
        );

        if (!table) {
            return res.status(404).json({ message: "Record not found...", success: false });
        }

        res.json({ message: 'Record deleted successfully...', table, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

export const updateTable = async (req, res) => {
    const recordId = req.params.id; // Record ID to update
    const { team, played, win, draw, loss, points, nrr } = req.body; // Updated fields

    try {
        // Find the document that contains the record and update the record by its ID
        let table = await Table.findOneAndUpdate(
            { "record._id": recordId }, // Find the document containing the record with this ID
            {
                $set: {
                    "record.$.team": team,
                    "record.$.played": played,
                    "record.$.win": win,
                    "record.$.draw": draw,
                    "record.$.loss": loss,
                    "record.$.points": points,
                    "record.$.nrr": nrr
                }
            },
            { new: true } // Return the updated document
        );

        if (!table) {
            return res.status(404).json({ message: "Record not found...", success: false });
        }

        res.json({ message: 'Record updated successfully...', table, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

// Controller to get all tables sorted by points in descending order
export const getAllTables = async (req, res) => {
    try {
        // Find all tables
        let tables = await Table.find().populate('eventId'); // Populate event details if needed

        // Sort each table's records by points in descending order
        tables = tables.map(table => {
            table.record.sort((a, b) => b.points - a.points);
            return table;
        });

        res.json({ message: 'Tables fetched successfully...', tables, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}