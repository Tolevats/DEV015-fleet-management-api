import { compare } from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { findUserByEmail } from '../repositories/userRepository';

//authenticating user and generating JWT
export const authenticateUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  //if the user is not found
  if (!user) {
    throw { status: 404, message: 'Invalid email or password' };
  }

  //comparing the provided password with the stored hashed password
  const isPasswordValid = user?.password && await compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 404, message: 'Invalid email or password' };
  }

  //generating a JWT token with the user's id
  const accessToken = generateToken(user.id);

  //returning the token and user info
  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};