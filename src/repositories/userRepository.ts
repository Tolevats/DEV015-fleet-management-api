import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//POST: create a user
export const createUser = async (name: string, email: string, password: string) => {
    try {
      const newUser = await prisma.users.create({
        data: {
        name,
        email,
        password, //when in production, the password should be hashed before storing it
      },
    });
    return newUser;
    console.log(newUser);

  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
    try {
      return await prisma.users.findUnique({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  };

//GET: list users with pagination
export const getUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit; // Calculate how many records to skip
  try {
    const users = await prisma.users.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  } catch (error) {
    throw error;
  }
};

//count total users (for pagination metadata)
export const countUsers = async () => {
  try {
    return await prisma.users.count();
  } catch (error) {
    throw error;
  }
};

//PATCH: modify a user
export const updateUser = async (uid: string, data: { name?: string }) => {
  try {
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
      throw new Error('User not found');
    }

    //then, update the user using their unique id
    const updatedUser = await prisma.users.update({
      where: {
        id: user.id, //use the found user's unique ID
      },
      data, //apply the provided update data
    });

    return user;
  } catch (error) {
    throw error;
  }
};
  
//DELETE: delete a user
export const deleteUser = async (uid: string | number) => {
  try {
    let user;

    if (typeof uid === 'number') {
      //search by id
      user = await prisma.users.findUnique({
        where: {
          id: uid,
        },
      });
    } else if (typeof uid === 'string') {
      //search by email
      user = await prisma.users.findUnique({
        where: {
          email: uid,
        },
      });
    }

    if (!user) {
      throw new Error('User not found');
    }

    //delete the user
    const deletedUser = await prisma.users.delete({
      where: {
        id: user.id,
      },
    });

    return deletedUser;
  } catch (error) {
    throw error;
  }
};
