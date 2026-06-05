import prisma from "../config/prisma.js";

export const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      accountType: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      profile: {
        select: {
          fullName: true,
          company: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) return null;

  // Normalize response shape for frontend expectations
  const fullName = user.profile?.fullName || user.name || null;

  const result = {
    id: user.id,
    fullName,
    email: user.email,
    accountType: user.accountType,
    createdAt: user.createdAt,
  };

  if (user.accountType === "COMPANY") {
    result.company = {
      name: user.profile?.company || null,
    };
  }

  return result;
};
