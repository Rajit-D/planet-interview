-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminNos" INTEGER NOT NULL,
    "avatarImg" TEXT,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgAdmin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "OrgAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_name_key" ON "Organisation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_email_key" ON "Organisation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OrgAdmin_email_key" ON "OrgAdmin"("email");

-- AddForeignKey
ALTER TABLE "OrgAdmin" ADD CONSTRAINT "OrgAdmin_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
