-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADIMN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'BASIC';
