import prisma from "../config/prisma.js";

export const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true }, // Select only the name and email fields from the user object
  });
  return user;
};
