import express from 'express';
import { addServiceProvider, getServiceProvider } from '../controllers/serviceController.js';

const router = express.Router();

// POST route for adding service providers
router.post('/post', addServiceProvider);
router.get('/:service', getServiceProvider)

export default router;
