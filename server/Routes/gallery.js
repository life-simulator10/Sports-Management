import express from 'express';
import { addGallery, getAllGallery } from '../Controllers/gallery.js';
const router = express.Router();

router.post('/add', addGallery);

router.get('/all', getAllGallery);

export default router;