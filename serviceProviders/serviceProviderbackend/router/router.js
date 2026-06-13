import express from 'express';
import { addServiceProvider } from '../controller/controller.js';

const router = express.Router();

// POST route for adding service providers
router.post('/post', addServiceProvider);

export default router;
