import Image from "next/image";
import Link from "next/link";

export interface Book {
  origin: string;
  coverUrl: string;
  details: {
    title: string;
  };
}

export interface BooksData {
  data: Book[];
}

export default function ClientPage({
  books,
  category,
}: {
  books: BooksData;
  category: string | null;
}) {
  // console.log({ category });
  return (
    <div>
      {/* <Typography
        variant="h4"
        color="primary"
        className="text-center   mt-2 mb-3"
      >
        {category}
      </Typography> */}
      <ul className="grid grid-cols-1   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 justify-items-center p-2">
        {books.data.map((book, index) => (
          <Link
            href={{
              pathname: `/books/category/book/${book.details.title}`,
              query: { category, book: book.details.title },
            }}
            key={index}
            className=" sp-container border p-4 w-full light-border rounded-2xl"
          >
            <div className="   rounded-sm  p-2 m-2  overflow-hidden">
              <div className="flex items-center flex-col justify-between">
                <div className="h-64 w-full relative">
                  <Image
                    src={book.coverUrl}
                    alt={book.details.title}
                    layout="fill" // required for making the image responsive within its parent
                    objectFit="contain" // keeps the image aspect ratio, fully contained within the div
                    className="" // keeps the rounded corners
                  />
                </div>

                <h1 className=" self-stretch mt-5 text-left line-clamp-1 lg:line-clamp-2 font-semibold">
                  {book.details.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
