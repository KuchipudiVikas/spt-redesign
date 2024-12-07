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
      <div textAlign="center" mb={3}>
        <h6 variant="h4" fontWeight="bold">
          Top Best Books
        </h6>
        <h6 variant="caption" color="textSecondary">
          Updated every 24h
        </h6>
        <div mt={1}>
          <Link href="/books/topbestbooks/snapshots" passHref>
            <h6 variant="body2">View Snapshots</h6>
          </Link>
        </div>
      </div>
      <div
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={2}
        justifyItems="center"
        p={2}
      >
        {topBooks?.data?.map((book) => (
          <Paper
            key={book.id}
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column-reverse",
              height: "60vh",
              width: "100%",
              maxWidth: 320,
              border: 1,
              borderColor: "grey.300",
              p: 2,
              transition: "all 0.3s",
              "&:hover": { divShadow: 6 },
            }}
          >
            <div mb={2}>
              <div display="flex" alignItems="start" mb={1}>
                <div
                  sx={{
                    backgroundColor: "amber.500",
                    color: "white",
                    py: 0.5,
                    px: 2,
                    clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
                  }}
                >
                  <h6 variant="h6" color="primary">
                    #{book.rank}
                  </h6>
                </div>
                <div>
                  {book.previousRank ? (
                    <h6 variant="caption" color="textSecondary">
                      Previous Rank:&nbsp;
                      <span style={{ color: "red" }}>#{book.previousRank}</span>
                    </h6>
                  ) : (
                    <h6 variant="caption" color="success.main">
                      New Book
                    </h6>
                  )}
                  <h6 variant="caption" color="textSecondary">
                    Days in Top 100:&nbsp;
                    <span style={{ color: "green" }}>
                      {book.daysInTop100 + 1}
                    </span>
                  </h6>
                  <h6
                    variant="caption"
                    color="textSecondary"
                    title={new Date(book.updatedAt).toISOString()}
                  >
                    Last Updated on{" "}
                    {new Date(book.updatedAt).toLocaleDateString()}
                  </h6>
                </div>
              </div>
              <Link href={book.bookLink} target="_blank">
                <h6 variant="body1" fontWeight="bold" color="primary">
                  {book.title}
                </h6>
              </Link>
              <h6 variant="body2" color="primary">
                &gt; {book.author}
              </h6>
              <div display="flex" alignItems="center" mt={1}>
                <Rating
                  name="text-feedback"
                  value={book.ratings}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <h6 variant="h6" color="amber.700">
                {book.price}
              </h6>
            </div>
            <div
              position="relative"
              width="100%"
              height="100%"
              overflow="hidden"
              borderRadius={1}
              mb={2}
            >
              <Image
                src={book.imageLink}
                alt="Book Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}
