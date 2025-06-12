import express from 'express';
import { addToTable, deleteFromTable, updateTable, getAllTables } from '../Controllers/table.js';

const router = express.Router();

//add record to event
router.post('/add', addToTable);
// Delete a record by its ID
router.delete('/delete/:id', deleteFromTable);
// Update a record by its ID
router.put('/update/:id', updateTable);
//get all table records
router.get('/all', getAllTables);


export default router;