-- CreateTable
CREATE TABLE "best_seller_books" (
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
CREATE TABLE "snapshot_history" (
    "id" SERIAL NOT NULL,
    "snapshot_taken_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "snapshot_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "best_seller_book_snapshots" (
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
CREATE TABLE "Book" (
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
CREATE TABLE "BookDetails" (
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
CREATE TABLE "TopReview" (
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
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "best_seller_books_book_link_key" ON "best_seller_books"("book_link");

-- CreateIndex
CREATE UNIQUE INDEX "Book_detailsId_key" ON "Book"("detailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "best_seller_book_snapshots" ADD CONSTRAINT "best_seller_book_snapshots_snapshot_history_id_fkey" FOREIGN KEY ("snapshot_history_id") REFERENCES "snapshot_history"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "BookDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopReview" ADD CONSTRAINT "TopReview_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
