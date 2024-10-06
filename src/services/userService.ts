import { createUser, findUserByEmail, getUsers, countUsers, updateUser, deleteUser } from '../repositories/userRepository';

//POST
export const createNewUser = async (name: string, email: string, password: string) => {
  //checking if a user with the email already exists:
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    console.log('User with email already exists:', email);  //log the email conflict
    throw { status: 409, message: 'User with that email already exists' };
  }
  //creating a new user:
  try {
    const newUser = await createUser(name, email, password);
    return newUser;
  } catch (error) {
    throw { status: 400, message: 'Error creating user' };
  }
};

//GET
export const fetchUsers = async (page: number = 1, limit: number = 10) => {
  //validate that page and limit are positive integers:
  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    throw { status: 400, message: 'Invalid page or limit parameters' };
  }
  //get users and total count:
  const users = await getUsers(page, limit);
  const totalUsers = await countUsers();
  //calculate total pages:
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    totalPages,
    currentPage: page,
    limit,
  };
};

//PATCH
export const updateUserData = async (uid: string, data: { name?: string }) => {
  //ensuring that email or password is not being updated
  if (data.hasOwnProperty('email') || data.hasOwnProperty('password')) {
    throw { status: 400, message: 'It is not possible to modify email or password' };
  }

  //then proceed to update the user
  try {
    const updatedUser = await updateUser(uid, data);
    return updatedUser;
  } catch (error: any) {
    if (error.message === 'User not found') {
    throw { status: 400, message: 'Error updating user' };
    } else {
    throw { status: 500, message: 'An error occurred while updating the user' };
    }
  }
};

//DELETE
export const removeUser = async (uid: string | number) => {
  try {
    const deletedUser = await deleteUser(uid);
    return deletedUser;
  } catch (error: any) {
    if (error.message === 'User not found') {
      throw { status: 404, message: 'User not found' };
    }
    throw { status: 500, message: 'Error deleting the user' };
  }
};