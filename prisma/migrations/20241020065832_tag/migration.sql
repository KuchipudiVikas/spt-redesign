/*
  Warnings:

  - Added the required column `addedById` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tag_slug_idx";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "addedById" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Tag_slug_addedById_idx" ON "Tag"("slug", "addedById");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
