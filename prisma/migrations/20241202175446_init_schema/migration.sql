-- CreateTable
CREATE TABLE "Roles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "minATS" INTEGER NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
