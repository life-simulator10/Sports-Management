import express from 'express';
import { addFixture, updateFixture, deleteFixture, getAllFixtures } from '../Controllers/fixtures.js';
const router = express.Router();

router.post('/add', addFixture);
router.get('/all', getAllFixtures);
router.put('/update/:id', updateFixture); // Update a fixture by its ID
router.delete('/delete/:id', deleteFixture); // Delete a fixture by its ID

export default router;
