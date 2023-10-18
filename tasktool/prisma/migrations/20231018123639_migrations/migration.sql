-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WichtigDringend', 'Wichtig', 'Dringend', 'Unwichtig');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "createtAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "finished" BOOLEAN NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
