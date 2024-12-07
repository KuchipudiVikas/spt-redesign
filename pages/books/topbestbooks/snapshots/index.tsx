import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { format } from "date-fns/format";
import MainLayout from "@/components/Layout";
export const revalidate = 10;

const getSnapHistory = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/book/topbestbooks/snapshots`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

interface SnapHistory {
  id: number;
  snapshotTakenAt: string;
}

export default function Snapshots({ info, snapHistory }) {
  return (
    <MainLayout
      meta={{
        title: "Snapshots",
        description: "Snapshots",
        keywords: "Snapshots",
      }}
      info={info}
      Body={
        <div>
          <h1 className="text-center mb-3 text-xl font-bold">Snapshots</h1>
          <ul className="max-w-7xl m-auto p-2">
            {snapHistory &&
              snapHistory.map((snap: SnapHistory, index: number) => (
                <Link
                  className="text-blue-700 underline underline-offset-1 mt-2 mb-2"
                  key={snap.id}
                  href={`/books/topbestbooks/snapshot/${snap.id}`}
                >
                  <p>
                    <strong>{index + 1}.</strong>&nbsp;Snapshot taken at&nbsp;
                    {format(new Date(snap.snapshotTakenAt), "PPPp")}
                  </p>
                </Link>
              ))}
          </ul>
        </div>
      }
    />
  );
}

export async function getServerSideProps() {
  const snapHistory = await getSnapHistory();
  console.log({ snapHistory });
  return {
    props: { snapHistory: snapHistory ? snapHistory : [] },
  };
}
