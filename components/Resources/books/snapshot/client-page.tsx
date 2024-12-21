"use client";
import { format } from "date-fns/format";
import Image from "next/image";
import Link from "next/link";

interface Book {
  data: [
    {
      id: string;
      title: string;
      author: string;
      imageLink: string;
      bookLink: string;
      price: string;
      rank: number;
      ratings: number;
      previousRank: number;
      daysInTop100: number;
      snapshotTakenAt: string;
    }
  ];
}

interface SnapHistory {
  id: number;
  snapshotTakenAt: string;
}

export default function TopBestBooksClient({
  topBooks,
  snapHistory,
}: {
  topBooks: Book;
  snapHistory: SnapHistory;
}) {
  // console.log({ snapHistory });
  return (
    <div>
      <div className="text-center m-3">
        <h1 className="font-bold text-xl">
          Top Best Books on:&nbsp;
          <span className="text-gray-500">
            {format(new Date(snapHistory.snapshotTakenAt), "PPPp")}
          </span>
        </h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          justifyItems: "center",
        }}
      >
        {topBooks?.data?.map((book) => (
          <div
            key={book.id}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              height: "60vh",
              width: "100%",
              maxWidth: 320,
              border: 1,
              borderColor: "grey.300",
              transition: "all 0.3s",
            }}
          >
            <div>
              <div>
                <div>
                  <h6 color="primary">#{book.rank}</h6>
                </div>
                <div>
                  {book.previousRank ? (
                    <h6 color="textSecondary">
                      Previous Rank:&nbsp;
                      <span style={{ color: "red" }}>#{book.previousRank}</span>
                    </h6>
                  ) : (
                    <h6 color="success.main">New Book</h6>
                  )}
                  <h6 color="textSecondary">
                    Days in Top 100:&nbsp;
                    <span style={{ color: "green" }}>
                      {book.daysInTop100 + 1}
                    </span>
                  </h6>
                  {/* <h6
                  
                    color="textSecondary"
                    title={new Date(book.updatedAt).toISOString()}
                  >
                    Last Updated on{" "}
                    {new Date(book.updatedAt).toLocaleDateString()}
                  </h6> */}
                </div>
              </div>
              <Link href={book.bookLink} target="_blank">
                <h6>{book.title}</h6>
              </Link>
              <h6 color="primary">&gt; {book.author}</h6>
              <div>
                {/* <Rating
                  name="text-feedback"
                  value={book.ratings}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                /> */}

                {/* TODO ADD THIS */}
              </div>
              <h6 color="amber.700">{book.price}</h6>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Image
                src={book.imageLink}
                alt="Book Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
