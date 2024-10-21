import { Request, Response } from 'express';
import { authenticateUser } from '../services/authService';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { token, userId } = await authenticateUser(email, password);
    return res.status(200).json({ token, userId });
  } catch (error: any) {
    return res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
  }
};
