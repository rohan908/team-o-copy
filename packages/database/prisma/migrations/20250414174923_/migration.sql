/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employeeID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `ServiceRequest` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `phoneNumber` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_employeeID_fkey";

-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "employeeID",
ADD COLUMN     "employeeid" SERIAL NOT NULL,
DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumber" INTEGER NOT NULL,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeid");

-- DropTable
DROP TABLE "ServiceRequest";

-- CreateTable
CREATE TABLE "langaugeServiceRequest" (
    "requestID" SERIAL NOT NULL,
    "room" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "langaugeServiceRequest_pkey" PRIMARY KEY ("requestID")
);

-- CreateTable
CREATE TABLE "directory" (
    "dName" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "absoluteCoords" INTEGER[],

    CONSTRAINT "directory_pkey" PRIMARY KEY ("dName","building")
);

-- CreateTable
CREATE TABLE "FloorMap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FloorMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "edges" INTEGER[],

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "mapId" INTEGER NOT NULL,
    "nodes" INTEGER[],

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "FloorMap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "FloorMap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
