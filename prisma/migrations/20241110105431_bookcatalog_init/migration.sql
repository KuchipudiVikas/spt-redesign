-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "bookcatalog";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "defaultdb";

-- CreateTable
CREATE TABLE "defaultdb"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defaultdb"."Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recommendedUse" TEXT,
    "imageUrl" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "addedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defaultdb"."ProductDownloaded" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductDownloaded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defaultdb"."Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addedById" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "defaultdb"."ProductTag" (
    "productId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("productId","tagId")
);

-- CreateTable
CREATE TABLE "bookcatalog"."best_seller_books" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER,
    "previous_rank" INTEGER,
    "rank_duration" INTEGER NOT NULL DEFAULT 0,
    "times_in_top_100" INTEGER NOT NULL DEFAULT 0,
    "first_appeared_at" TIMESTAMP(3),
    "last_appeared_at" TIMESTAMP(3),
    "days_in_top_100" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT,
    "author" TEXT,
    "price" TEXT,
    "image_link" TEXT,
    "book_link" TEXT,
    "ratings" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "best_seller_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookcatalog"."snapshot_history" (
    "id" SERIAL NOT NULL,
    "snapshot_taken_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "snapshot_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookcatalog"."best_seller_book_snapshots" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER,
    "previous_rank" INTEGER,
    "rank_duration" INTEGER NOT NULL DEFAULT 0,
    "times_in_top_100" INTEGER NOT NULL DEFAULT 0,
    "first_appeared_at" TIMESTAMP(3),
    "last_appeared_at" TIMESTAMP(3),
    "days_in_top_100" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT,
    "author" TEXT,
    "price" TEXT,
    "image_link" TEXT,
    "book_link" TEXT,
    "ratings" DOUBLE PRECISION,
    "snapshot_taken_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "snapshot_history_id" INTEGER,

    CONSTRAINT "best_seller_book_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookcatalog"."Book" (
    "id" SERIAL NOT NULL,
    "origin" TEXT,
    "coverUrl" TEXT,
    "reviewRating" DOUBLE PRECISION,
    "numberOfRatings" INTEGER,
    "description" TEXT,
    "metaDescription" TEXT,
    "introduction" TEXT,
    "keyTakeaways" TEXT,
    "inDepthDescription" TEXT,
    "standoutFeatures" TEXT,
    "detailsId" INTEGER,
    "categoryId" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookcatalog"."BookDetails" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "authors" TEXT,
    "publisher" TEXT,
    "publicationDate" TEXT,
    "pages" TEXT,
    "language" TEXT,
    "isbn10" TEXT,
    "isbn13" TEXT,
    "dimensions" TEXT,
    "weight" TEXT,
    "kindlePrice" TEXT,
    "hardcoverPrice" TEXT,
    "paperbackPrice" TEXT,
    "audiobookPrice" TEXT,
    "audiocdPrice" TEXT,

    CONSTRAINT "BookDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookcatalog"."TopReview" (
    "id" SERIAL NOT NULL,
    "reviewerName" TEXT,
    "reviewerRatings" TEXT,
    "reviewTitle" TEXT,
    "verifiedPurchase" BOOLEAN,
    "reviewDate" TEXT,
    "reviewDescription" TEXT,
    "bookId" INTEGER,

    CONSTRAINT "TopReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookcatalog"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "defaultdb"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "defaultdb"."User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "defaultdb"."User"("username");

-- CreateIndex
CREATE INDEX "Product_addedById_idx" ON "defaultdb"."Product"("addedById");

-- CreateIndex
CREATE INDEX "ProductDownloaded_productId_userId_idx" ON "defaultdb"."ProductDownloaded"("productId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "defaultdb"."Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "defaultdb"."Tag"("slug");

-- CreateIndex
CREATE INDEX "Tag_slug_addedById_idx" ON "defaultdb"."Tag"("slug", "addedById");

-- CreateIndex
CREATE UNIQUE INDEX "best_seller_books_book_link_key" ON "bookcatalog"."best_seller_books"("book_link");

-- CreateIndex
CREATE UNIQUE INDEX "Book_detailsId_key" ON "bookcatalog"."Book"("detailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "bookcatalog"."Category"("name");

-- AddForeignKey
ALTER TABLE "defaultdb"."Product" ADD CONSTRAINT "Product_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "defaultdb"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defaultdb"."ProductDownloaded" ADD CONSTRAINT "ProductDownloaded_productId_fkey" FOREIGN KEY ("productId") REFERENCES "defaultdb"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defaultdb"."ProductDownloaded" ADD CONSTRAINT "ProductDownloaded_userId_fkey" FOREIGN KEY ("userId") REFERENCES "defaultdb"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defaultdb"."Tag" ADD CONSTRAINT "Tag_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "defaultdb"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defaultdb"."ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "defaultdb"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defaultdb"."ProductTag" ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "defaultdb"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookcatalog"."best_seller_book_snapshots" ADD CONSTRAINT "best_seller_book_snapshots_snapshot_history_id_fkey" FOREIGN KEY ("snapshot_history_id") REFERENCES "bookcatalog"."snapshot_history"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookcatalog"."Book" ADD CONSTRAINT "Book_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "bookcatalog"."BookDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookcatalog"."Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "bookcatalog"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookcatalog"."TopReview" ADD CONSTRAINT "TopReview_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "bookcatalog"."Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
