import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import generateToken from "../utils/generateToken.js";

export const registerUserService = async (name, email, password) => {

  // existing user check
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: hashedPassword,
    },
  });

  // generate token
  const token = generateToken(user.id);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
};