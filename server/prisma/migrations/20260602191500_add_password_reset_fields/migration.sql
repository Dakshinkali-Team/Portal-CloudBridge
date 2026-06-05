-- Add password reset support to the User table
ALTER TABLE "User"
ADD COLUMN "resetToken" TEXT,
ADD COLUMN "resetTokenExpiry" TIMESTAMP(3);
