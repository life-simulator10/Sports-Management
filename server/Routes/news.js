import express from 'express';
import { addNews, getNewsById, getAllNews, getLatestNews } from '../Controllers/news.js';
const router = express.Router();

router.post('/add', addNews);

router.get('/three', getLatestNews);

router.get('/all', getAllNews);

router.get('/:id', getNewsById);

export default router;