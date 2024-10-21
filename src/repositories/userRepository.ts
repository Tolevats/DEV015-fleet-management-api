import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

//POST: create a user
export const createUser = async (name: string, email: string, password: string) => {
  const newUser = await prisma.users.create({
        data: {
        name,
        email,
        password, //when in production, the password should be hashed before storing it
      },
    });
    return newUser;
    // console.log(newUser);
};
//finding user by email
export const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};
//verifying password using bcrypt
export const verifyPassword = async (inputPassword: string, storedPassword: string) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

//GET: list users with pagination
export const getUsers = async (page: number, limit: number) => {
  const users = await prisma.users.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  return users;
};

//PATCH: modify/update a user
export const updateUser = async (uid: string, data: { name?: string }) => {
  //first, find the user by id or email
  const user = await prisma.users.findFirst({
    where: {
      OR: [
        { id: !isNaN(Number(uid)) ? Number(uid) : undefined }, //check if uid is a number
        { email: uid } //otherwise, treat it as an email
      ],
    },
  });
  //if user not found, throw error
  if (!user) {
    throw new Error('User not found'); // Throw error for missing user
  }
  //then, update the user using their unique id
  const updatedUser = await prisma.users.update({
    where: {
      id: user?.id, //use the found user's unique ID
    },
    data: {
      name: data.name ?? user?.name, //update the name only if provided
    },
  });

  return updatedUser; //return the updated user object
};
  
//DELETE: delete a user
export const deleteUser = async (uid: string) => {
  return await prisma.users.delete({
    where: {
      id: parseInt(uid) || undefined,
      email: isNaN(parseInt(uid)) ? uid : undefined,
    },
  });
};