import MainLayout from "@/components/Layout";
import ClientPage, {
  BooksData,
} from "@/components/Resources/books/category/client-page";
import Categories from "@/pages/books/allcategories/categories.json";
import PageTitle from "@/components/Common/PageTitle";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const revalidate = 10;

const getBooks = async (category: string | undefined) => {
  try {
    const response = await fetch(baseUrl + "/api/book/getbooks", {
      method: "POST",

      body: JSON.stringify({ category }),
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve books: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving books:", error);
    return null;
  }
};

interface SingleResourceProps {
  info: any;
  category: string;
  books: BooksData;
}

export default function BooksCategoryPage({
  info,
  category,
  books,
}: SingleResourceProps) {
  console.log({ category, books });

  // if (!category) {
  //   return (
  //     <div>
  //       <h1>Category Not Found</h1>
  //     </div>
  //   );
  // }
  // return (
  //   <div>
  //     <ClientPage books={books && books} category={category} />
  //   </div>
  // );

  return (
    <MainLayout
      info={info}
      // transparentNav
      meta={{
        title: category,
        description: `Books in the category of ${category}`,
        keywords: `${category}, books, ${category} books`,
      }}
      Title={<PageTitle title={category} />}
      Body={
        <div className="min-h-96 mt-12">
          <div className="m-2"></div>
          <ClientPage books={books && books} category={category} />
        </div>
      }
    />
  );
}

export async function getServerSideProps(ctx) {
  const { category } = ctx.params;

  // Retrieve the matching category
  const selectedCategory = Categories.find(
    (item) => item.link === category
  )?.category;

  // Log if no matching category is found
  if (!selectedCategory) {
    console.error(`No category found for link: ${category}`);
  }

  // Fetch books based on the category
  const books = await fetch(`${baseUrl}/api/book/getbooks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: selectedCategory }),
  })
    .then((res) => res.json())
    .then((data) => data || null)
    .catch((error) => {
      console.error("Error retrieving books:", error);
      return null;
    });

  console.log({ books });

  return {
    props: { books, category },
  };
}
