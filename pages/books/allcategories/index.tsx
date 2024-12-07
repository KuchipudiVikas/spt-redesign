import Categories from "./categories.json";
import ClientTopBooks from "@/components/Resources/books/client-page";
import MainLayout from "@/components/Layout";
import PageTitle from "@/components/Common/PageTitle";

export interface Category {
  id: number;
  category: string;
  link: string;
}

export default function TopBooks({ info }) {
  return (
    <MainLayout
      info={info}
      Title={<PageTitle title="All Books Categories" />}
      meta={{
        title: "All Books Categories",
        description: "All Books Categories",
        keywords: "All Books Categories",
      }}
      Body={
        <div className="min-h-96">
          <div className="m-2"></div>
          <ClientTopBooks Categories={Categories} />
        </div>
      }
    />
  );
}
