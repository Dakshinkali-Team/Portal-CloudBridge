/*
  Warnings:

  - The `accountType` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `category` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "category" "ServiceCategory" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountType",
ADD COLUMN     "accountType" "AccountType" NOT NULL DEFAULT 'INDIVIDUAL';

-- DropEnum
DROP TYPE "ACCOUNT_TYPE";
