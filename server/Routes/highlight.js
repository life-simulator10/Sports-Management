import express from 'express';
import { addHighlight, getLatestHighlight, getAllHits } from '../Controllers/highlight.js';
const router = express.Router();

router.post('/add', addHighlight);

router.get('/all', getAllHits)

router.get('/one', getLatestHighlight);

export default router;