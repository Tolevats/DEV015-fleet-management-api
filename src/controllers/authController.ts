import { Request, Response } from 'express';
import { authenticateUser } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Authenticate the user
    const { accessToken, user } = await authenticateUser(email, password);

    // If authentication is successful, respond with token and user info
    res.status(200).json({ accessToken, user });
  } catch (error: any) {
    // Handle invalid credentials (404)
    if (error.status === 404) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    // Handle server errors (500)
    res.status(500).json({ error: 'Internal server error' });
  }
};