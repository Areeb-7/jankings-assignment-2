import jwt from 'jsonwebtoken'; // Import the default export
const { sign, verify } = jwt; // Destructure sign and verify from the default export

export function generateToken(userId) {
  return sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
}

export function verifyToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
}
