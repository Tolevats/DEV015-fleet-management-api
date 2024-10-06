import { Request, Response } from 'express';
import { createNewUser, fetchUsers, updateUserData, removeUser } from '../services/userService';

//POST: create a user
export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
  
    //ensuring that name, email, and password are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
  
    try {
      const newUser = await createNewUser(name, email, password);
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } catch (error: any) {
        if (error.status === 409) {
          return res.status(409).json({ error: error.message })
        }
      // Handle general errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

//GET: list users with pagination
export const getUsers = async (req: Request, res: Response) => {
  //get query parameters
  const pageParam = req.query.page as string;
  const limitParam = req.query.limit as string;

  //apply default values only if parameters are undefined or missing
  const page = pageParam ? parseInt(pageParam, 10) : 1; //default to 1 if missing
  const limit = limitParam ? parseInt(limitParam, 10) : 10; //default to 10 if missing

  //validate that page and limit are positive integers
  if (isNaN(page) || page < 1) {
    return res.status(400).json({ error: 'Invalid page parameter' });
  }
  if (isNaN(limit) || limit < 1) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  //fetch paginated users
  try {
    const users = await fetchUsers(page, limit);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

//PATCH: modify/update a user
export const patchUser = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const data = req.body;

  //ensure the request body contains something to update
  if (!data || !Object.keys(data).length) {
    return res.status(400).json({ error: 'Request body is required' });
  }

  try {
    const updatedUser = await updateUserData(uid, data);
    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error: any) {
    if (error.status === 400) {
      return res.status(400).json({ error: error.message });
    }
    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

//DELETE
export const deleteUser = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const deletedUser = await removeUser(uid);
    res.status(200).json({
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email,
    });
  } catch (error: any) {
    if (error.status === 404) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  }
};