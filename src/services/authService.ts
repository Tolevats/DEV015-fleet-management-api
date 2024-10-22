import jwt from 'jsonwebtoken';
import { findUserByEmail, verifyPassword } from '../repositories/userRepository';

// Define a secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRATION = '1h'; // Set a suitable expiration time

// Authenticate user and generate JWT
export const authenticateUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const isPasswordValid = user?.password && await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  // Create a JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );

  return { token, userId: user.id };
};
