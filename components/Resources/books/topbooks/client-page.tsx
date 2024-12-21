"use client";

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
      updatedAt: string;
    }
  ];
}

export default function TopBestBooksClient({ topBooks }: { topBooks: Book }) {
  // console.log(topBooks);
  return (
    <div className="mt-8">
      <div className="mb-3">
        <h6>Top Best Books</h6>
        <h6 color="textSecondary">Updated every 24h</h6>
        <div className="mt-3">
          <Link href="/books/topbestbooks/snapshots" passHref>
            <h6>View Snapshots</h6>
          </Link>
        </div>
      </div>
      <div>
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
              <div style={{ display: "flex", gap: 1 }}>
                <div
                  style={{
                    backgroundColor: "amber.500",
                    color: "white",
                    clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
                  }}
                >
                  <h6>#{book.rank}</h6>
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
                  <h6
                    color="textSecondary"
                    title={new Date(book.updatedAt).toISOString()}
                  >
                    Last Updated on{" "}
                    {new Date(book.updatedAt).toLocaleDateString()}
                  </h6>
                </div>
              </div>
              <Link href={book.bookLink} target="_blank">
                <h6>{book.title}</h6>
              </Link>
              <h6 color="primary">&gt; {book.author}</h6>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {/* <Rating
                  name="text-feedback"
                  value={book.ratings}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                /> */}
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
