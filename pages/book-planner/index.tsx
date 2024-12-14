import Board from "@/components/planner/board";
import MainLayout from "@/components/Layout";
import { getSession } from "next-auth/react";
import { getProfile } from "@/components/Layout";

interface IndexProps {
  token: string;
  info: any;
}

const Index: React.FC<IndexProps> = ({ token, info }) => {
  return (
    <MainLayout
      meta={{
        title: "Book Planner",
        description: "Plan your book reading journey with Book Planner",
        keywords: "book planner, book reading, book planner app",
      }}
      info={info}
      Title={<></>}
      Body={<Board info={info} />}
    />
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session: any = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (session && session.token) {
    return getProfile(context, {
      token: session.token,
    });
  }
}
