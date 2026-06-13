import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/authController.js';
import { check } from 'express-validator';

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  // check('phone', 'Phone number is required').not().isEmpty(),
  // check('adress', 'adress is required').not().isEmpty()
], register);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], login);

export default router;