import { createUser, findUserByEmail, getUsers, updateUser, deleteUser } from '../repositories/userRepository';

//POST
export const createNewUser = async (name: string, email: string, password: string) => {
  //checking if a user with the email already exists:
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    console.log('User with email already exists:', email);  //log the email conflict
    throw { status: 409, message: 'User with that email already exists' };
  }
  //creating a new user:
  const newUser = await createUser(name, email, password);
  return newUser;
};

//GET
export const fetchUsers = async (page: number = 1, limit: number = 10) => {
  return getUsers(page, limit);
};

//PATCH
export const updateUserData = async (uid: string, data: { name?: string }) => {
  //ensuring that email or password is not being updated
  if (data.hasOwnProperty('email') || data.hasOwnProperty('password')) {
    throw { status: 400, message: 'It is not possible to modify email or password' };
  } 
  //validating allowed fields
  const allowedFields = ['name']; // List of allowed update fields
  const keys = Object.keys(data);
  //checking if the data contains only allowed fields
  if (!data || !keys.length || !keys.every(key => allowedFields.includes(key))) {
    throw { status: 400, message: 'Invalid request body' };
  }
  //proceed to update the user using uid (which can be either id or email)
  const updatedUser = await updateUser(uid, data);
  return updatedUser;
};

//DELETE
export const removeUser = async (uid: string) => {
  const deletedUser = await deleteUser(uid);
  return deletedUser;
};
/* export const removeUser = async (uid: string | number) => {
  const deletedUser = await deleteUser(uid);
  //returning null if no user is found
  if (!deletedUser) {
    return null;
  }
  return deletedUser;
}; */