import MainLayout from "@/components/Layout";
import TopBestBooksClient from "@/components/Resources/books/snapshot/client-page";

interface SingleResourceProps {
  params: {
    id: string;
  };
}
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const revalidate = 10;

const getBestSellerBookSnapshots = async (id: string) => {
  console.log({ id });
  try {
    const response = await fetch(`${baseUrl}/api/book/topbestbooks/snapshot`, {
      method: "POST",

      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getSnapHistory = async (id: string) => {
  console.log({ id });
  try {
    const response = await fetch(
      `${baseUrl}/api/book/topbestbooks/getsnaphistory`,
      {
        method: "POST",

        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export default function SnapShot({ info, topBooks, snapHistory }) {
  //   console.log({ snapHistory, id });
  console.log({ topBooks });
  return (
    <MainLayout
      Title={<></>}
      info={info}
      meta={{
        title: "Top Best Books",
        description: "Top Best Books",
        keywords: "Top Best Books",
      }}
      Body={
        <div className="mt-8">
          <TopBestBooksClient
            topBooks={topBooks}
            snapHistory={snapHistory && snapHistory}
          />
        </div>
      }
    />
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  // console.log({ id });

  if (!id) {
    return {
      notFound: true,
    };
  }

  const topBooks = await fetch(`${baseUrl}/api/book/topbestbooks/snapshot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
  const snapHistory = await fetch(
    `${baseUrl}/api/book/topbestbooks/getsnaphistory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id }),
    }
  )
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((error) => console.error(error));
  return {
    props: { topBooks, snapHistory },
  };
}
