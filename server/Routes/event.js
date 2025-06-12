import express from 'express';
import { addEvent, deleteEvent, updateEvent, getAllEvents, getById } from '../Controllers/event.js';
const router = express.Router();

// Route to add event
router.post('/add', addEvent);

//Route to delete event
router.delete('/delete/:id', deleteEvent);

// Route to update an existing event
router.put('/update/:id', updateEvent);

//Route to get event by specific Id
router.get('/get/:id', getById);


// Route to get all events
router.get('/all', getAllEvents);


export default router;