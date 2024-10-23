//utility to generate JWT tokens
import jwt from 'jsonwebtoken';

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// Token expiration time
const TOKEN_EXPIRATION = '1h';

// Generate JWT token
export const generateToken = (userId: string | number) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};
