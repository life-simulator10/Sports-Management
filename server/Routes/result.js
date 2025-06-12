import express from 'express';
import { addResult, updateResult, deleteResult, getAllResults, getLatestResults } from '../Controllers/result.js';
const router = express.Router();

router.post('/add', addResult);
router.get('/all', getAllResults);
router.get('/latest', getLatestResults);
router.put('/update/:id', updateResult); // Update a result by its ID
router.delete('/delete/:id', deleteResult); // Delete a result by its ID

export default router;
