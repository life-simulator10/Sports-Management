import express from 'express';
import { addMessage, getAllMessage } from '../Controllers/message.js';
import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// Protect the 'add' route to allow only authenticated users to add messages
router.post('/add', addMessage);

// Protect the 'all' route to allow only authenticated users to view messages
router.get('/all', Authenticated, getAllMessage);

export default router;
