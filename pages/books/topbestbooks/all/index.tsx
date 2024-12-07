import MainLayout from "@/components/Layout";
import TopBestBooksClient from "@/components/Resources/books/topbooks/client-page";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import PageTitle from "@/components/Common/PageTitle";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const revalidate = 10;

const getTopBestBooks = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/book/bestsellerbooks`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function TopBestBooks({ info, topBestBooks }) {
  return (
    <MainLayout
      info={info}
      meta={{
        title: "Top Best Books",
        description: "Top Best Books",
        keywords: "Top Best Books",
      }}
      Title={<PageTitle title="Top Best Books" />}
      Body={
        <div>
          <TopBestBooksClient topBooks={topBestBooks} />
        </div>
      }
    />
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const topBestBooks = await getTopBestBooks();
  return {
    props: { topBestBooks },
  };
}
