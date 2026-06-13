import { validationResult, check } from 'express-validator';

export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const bookingValidationRules = [
  check('service', 'Service ID is required').notEmpty(),
  check('scheduledDate', 'Scheduled date is required').notEmpty().isISO8601(),
  check('address.street', 'Street address is required').notEmpty(),
  check('address.city', 'City is required').notEmpty(),
  check('address.state', 'State is required').notEmpty(),
  check('address.zipCode', 'Zip code is required').notEmpty(),
  check('totalAmount', 'Total amount is required').isNumeric()
];

export const serviceValidationRules = [
  check('name', 'Service name is required').notEmpty(),
  check('category', 'Valid category is required').isIn([
    'cleaning',
    'plumbing',
    'electrical',
    'carpentry',
    'painting',
    'appliance_repair'
  ]),
  check('description', 'Description is required').notEmpty(),
  check('price.base', 'Base price is required').isNumeric(),
  check('price.unit', 'Valid price unit is required').isIn([
    'per_hour',
    'per_visit',
    'per_sqft'
  ]),
  check('duration', 'Duration in minutes is required').isNumeric()
];