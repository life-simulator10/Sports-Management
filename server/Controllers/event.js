import { Event } from "../Models/Event.js";
import cloudinary from '../utils/cloudinary.js';

//creating an event
export const addEvent = async (req, res) => {
    const { name, eventImage, startDate, endDate, desc } = req.body;

    try {
        // Check if event already exists
        let event = await Event.findOne({
            name: { $regex: new RegExp(name, 'i') }
        });

        if (event) {
            return res.json({ message: "Event already exists...", success: false });
        }

        let imageUrl = null;

        // Upload image to Cloudinary if provided
        if (eventImage) {
            const result = await cloudinary.uploader.upload(eventImage, {
                folder: "Event"
            });
            imageUrl = { public_id: result.public_id, url: result.secure_url };
        }

        // Create new event
        event = await Event.create({
            name,
            eventImage: imageUrl,
            startDate,
            endDate,
            desc
        });

        res.json({ message: "Event created successfully...!", event, success: true });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: error.message, success: false });
    }
};

//deleting an event by id
export const deleteEvent = async (req, res) => {
    const id = req.params.id;
    try {
        let event = await Event.findByIdAndDelete(
            id
        );
        if (!event) return res.json({ message: "Event Id not found...", success: false });
        res.json({ message: "Event deleted successfully...!", success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//updating an event
export const updateEvent = async (req, res) => {
    const id = req.params.id;
    const { name, startDate, endDate, desc } = req.body;

    try {
        let event = await Event.findByIdAndUpdate(
            id,
            { name, startDate, endDate, desc },
            { new: true }
        );

        if (!event) return res.json({ message: "Event not found...", success: false });

        res.json({ message: "Event updated successfully...!", event, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//get event by id
export const getById = async (req, res) => {
    const id = req.params.id;
    try {
        let event = await Event.findById(id);
        if (!event) return res.json({ message: "Event not found...", success: false })
        res.json({ message: "Specific Event", event })
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

//get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ events, success: true });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.json({ message: error.message, success: false });
    }
}