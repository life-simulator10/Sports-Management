import { Message } from '../Models/Message.js';

// Controller to add a new message
export const addMessage = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, message } = req.body;

        // Create a new message using the data from the request
        const newMessage = new Message({
            firstName,
            lastName,
            email,
            phoneNo,
            message,
        });

        // Save the message to the database
        const savedMessage = await newMessage.save();
        res.status(201).json({
            success: true,
            data: savedMessage,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Controller to delete a message by ID
export const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;

        // Find the message by ID and delete it
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({
                success: false,
                message: 'Message not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Controller to get all messages
export const getAllMessage = async (req, res) => {
    try {
        // Fetch all messages from the database
        const messages = await Message.find();

        // If no messages found, return a 404 response
        if (!messages.length) {
            return res.status(404).json({
                success: false,
                message: 'No messages found',
            });
        }

        // Return the list of messages with a 200 status
        res.status(200).json({
            success: true,
            data: messages,
        });
    } catch (error) {
        // Handle any errors and return a 400 status
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};