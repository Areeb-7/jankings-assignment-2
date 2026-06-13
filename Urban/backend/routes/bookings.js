import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import { bookingValidationRules } from '../utils/validation.js';
import { createBooking, getUserBookings, updateBookingStatus } from '../controllers/bookingController.js';

router.post('/', [auth, ...bookingValidationRules], createBooking);
router.get('/user', auth, getUserBookings);
router.put('/:id/status', auth, updateBookingStatus);

export default router;