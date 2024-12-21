import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { Metadata } from "next";
import MainLayout from "@/components/Layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 10;
type Review = {
  reviewerName: string;
  reviewerRatings: string;
  reviewTitle: string;
  reviewDate: string;
  reviewDescription: string;
};

type Book = {
  book?: {
    topReviews?: Review[];
  };
};

const getBook = async (
  category?: string | string[] | undefined,
  bookTitle?: string | string[] | undefined
) => {
  try {
    const response = await fetch(baseUrl + "/api/book/getsinglebook", {
      method: "POST",
      cache: "no-store",
      next: { revalidate: 10 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({ category, bookTitle }),
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve books: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error retrieving books:", error);
    return null;
  }
};

// type Props = {
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata({
//   searchParams,
// }: Props): Promise<Metadata> {

//   if (!bookData) {
//     return {
//       title: 'Resource not found',
//     };
//   }

//   return {
//     title: bookData.title,
//     description: bookData.book.metaDescription,
//     openGraph: {
//       title: bookData.title,
//       description: bookData.book.metaDescription,
//       images: [
//         {
//           url: bookData.book.coverUrl,
//           width: 800,
//           height: 600,
//           alt: bookData.title,
//         },
//       ],
//     },
//   };
// }

export default function Book({ info, book }: { info: any; book: any }) {
  // console.log('searchParams', searchParams);

  if (!book) return <p>Book not found.</p>;

  const cleanKeyTakeaways = (keyTakeaways: string): string[] => {
    return keyTakeaways
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const keyTakeawaysArray = book.book?.keyTakeaways
    ? cleanKeyTakeaways(book.book.keyTakeaways)
    : [];

  const cleanStandoutFeatures = (standoutFeatures: string): string[] => {
    return standoutFeatures
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const standoutFeatures = book.book?.standoutFeatures
    ? cleanStandoutFeatures(book.book.standoutFeatures)
    : "";

  const featuresText = Array.isArray(standoutFeatures)
    ? standoutFeatures.join(" ")
    : standoutFeatures;

  const wordsStand = featuresText.split(/\s+/);
  const standoutFeaturesArray = [];

  for (let i = 0; i < wordsStand.length; i += 50) {
    standoutFeaturesArray.push(wordsStand.slice(i, i + 50).join(" "));
  }

  const cleanDescription = (description: string): string => {
    return description.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  };

  const cleanedDescription = book.book?.inDepthDescription
    ? cleanDescription(book.book.inDepthDescription)
    : "";

  const words = cleanedDescription.split(/\s+/);
  const chunkedDescription = [];

  for (let i = 0; i < words.length; i += 50) {
    chunkedDescription.push(words.slice(i, i + 50).join(" "));
  }

  return (
    <MainLayout
      Title={<></>}
      info={info}
      meta={{
        title: book.title,
        description: book.book?.metaDescription,
        keywords: book.book?.metaKeywords,
      }}
      // transparentNav={true}
      Body={
        <div className="max-w-7xl m-auto p-2 text-gray-700">
          {book.title && (
            <div className="max-w-4xl m-auto">
              <h6 className="mt-2 text-3xl mb-4 font-bold">{book.title}</h6>
              <div className="pl-4">
                {book.authors && (
                  <h6 className="text-gray-600 mt-2">
                    {book.authors.replace(/{|}|"/g, "").split(",").join(", ")}
                  </h6>
                )}
                {book.publisher && (
                  <h6 className="text-gray-600 mt-2">{book.publisher}</h6>
                )}
                {book.publicationDate && (
                  <h6 className="text-gray-600 mt-2">{book.publicationDate}</h6>
                )}
              </div>
            </div>
          )}

          {book.book?.introduction && (
            <div className="max-w-4xl m-auto mt-3">
              <h6 className="text-xl font-semibold">Introduction</h6>
              <h6 className="text-gray-600 mt-2 pl-4">
                {book.book.introduction}
              </h6>
            </div>
          )}

          {keyTakeawaysArray.length > 0 && (
            <div className="max-w-4xl m-auto mt-3">
              <h6 className="text-xl font-semibold">Key Takeaways:</h6>
              {keyTakeawaysArray.map((keyTakeaway, index) => (
                <h6 className="pl-4 text-gray-600 mt-2" key={index}>
                  {keyTakeaway}
                </h6>
              ))}
            </div>
          )}

          <div className="max-w-4xl m-auto mt-3">
            <h6 className="text-xl font-semibold">
              In Depth Book Description:
            </h6>
            {chunkedDescription.map((description, index) => (
              <h6 key={index} className="text-gray-600 mt-2 pl-4">
                {description}
              </h6>
            ))}
          </div>

          {standoutFeaturesArray.length > 0 && (
            <div className="max-w-4xl m-auto mt-3">
              <h6 className="text-xl font-semibold">Standout Features:</h6>
              {standoutFeaturesArray.map((standoutFeature, index) => (
                <h6 className="text-gray-600 mt-2 pl-4" key={index}>
                  {standoutFeature}
                </h6>
              ))}
            </div>
          )}

          <div className="book-details max-w-4xl m-auto mt-3">
            <h6 className="text-xl font-semibold">
              Book Details and Specifications
            </h6>
            <div className="pl-4">
              <h6 className="text-gray-600 mt-2">
                <strong>Title:</strong> {book.title || "Not available"}
              </h6>
              <h6>
                <strong>Publisher:</strong> {book.publisher || "Not available"}
              </h6>
              <h6>
                <strong>Publication Date:</strong>{" "}
                {book.publicationDate || "Not available"}
              </h6>
              <h6>
                <strong>Pages:</strong> {book.pages || "Not available"}
              </h6>
              <h6>
                <strong>Language:</strong> {book.language || "Not available"}
              </h6>
              <h6>
                <strong>ISBN-10:</strong> {book.isbn10 || "Not available"}
              </h6>
              <h6>
                <strong>ISBN-13:</strong> {book.isbn13 || "Not available"}
              </h6>
              <h6>
                <strong>Dimensions:</strong>{" "}
                {book.dimensions || "Not available"}
              </h6>
              <h6>
                <strong>Weight:</strong> {book.weight || "Not available"}
              </h6>
              <h6>
                <strong>Kindle Price:</strong>{" "}
                {book.kindlePrice || "Not available"}
              </h6>
              <h6>
                <strong>Hardcover Price:</strong>{" "}
                {book.hardcoverPrice || "Not available"}
              </h6>
              <h6>
                <strong>Paperback Price:</strong>{" "}
                {book.paperbackPrice || "Not available"}
              </h6>
              <h6>
                <strong>Audiobook Price:</strong>{" "}
                {book.audiobookPrice || "Not available"}
              </h6>
              <h6>
                <strong>Audiocd Price:</strong>{" "}
                {book.audiocdPrice || "Not available"}
              </h6>
            </div>
          </div>

          {book.book?.coverUrl && (
            <div className="mt-3 w-fit m-auto rounded-md">
              <Image
                src={book.book.coverUrl}
                alt={book.title || "Book Cover"}
                width={300}
                height={400}
                className="rounded-md"
              />
            </div>
          )}

          {book.book?.description && (
            <div className="max-w-4xl m-auto mt-3">
              <h6 className="text-xl font-semibold">Description</h6>
              <h6 className="pl-4">{book.book.description}</h6>
            </div>
          )}

          {book.book?.topReviews && (
            <div className="max-w-4xl m-auto mt-3">
              <h6 className="text-xl font-semibold">Top Reviews:</h6>
              {book.book.topReviews.map((review: Review, index: number) => (
                <div key={index} className="mt-2 border rounded-xl p-2 pl-4">
                  <h6 className="text-blue-700">{review.reviewerName}</h6>
                  <h6 className="text-xl font-semibold">
                    <strong>Ratings:</strong> {review.reviewerRatings}
                  </h6>
                  <h6 className="italic">{review.reviewTitle}</h6>
                  <h6 className="mb-2">{review.reviewDate}</h6>
                  <h6>{review.reviewDescription}</h6>
                </div>
              ))}
            </div>
          )}

          {book.book?.origin && (
            <div className="w-full pt-5 mb-10 flex justify-center">
              <Button
                variant={"outline"}
                className="mt-3 mt-3 rounded-full t-5  w-fit m-auto"
              >
                <Link
                  href="https://amzn.to/48qU2zX"
                  target="_blank"
                  className="underline flex items-center gap-3   p-2 rounded-sm "
                >
                  Book on Amazon <ArrowRight />
                </Link>
              </Button>
            </div>
          )}
        </div>
      }
    />
  );
}

export async function getServerSideProps(ctx) {
  // const categoryValue = searchParams['category'] as string;
  // const bookValue = searchParams['book'] as string;
  const categoryValue = ctx.query.category as string;
  const bookValue = ctx.query.book as string;

  const bookData = await getBook(categoryValue, bookValue);

  return {
    props: {
      book: bookData,
    },
  };
}
