import express from 'express';
import { addProgram, deleteProgram, updateProgram, getAllProgram } from '../Controllers/program.js';

const router = express.Router();

// Route to add a program
router.post('/add', addProgram);

// Route to delete a program by ID
router.delete('/delete/:id', deleteProgram);

// Route to update an existing program by ID
router.put('/update/:id', updateProgram);

// Route to get all programs
router.get('/all', getAllProgram);

export default router;
