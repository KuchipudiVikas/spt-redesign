import React from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import TitansProOnsitePage from "@/page_components/Tools/TitansProOnsite2";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/lib/ts/types/user";
import { StarIcon } from "lucide-react";
import BySptButton from "@/components/Common/BySptButton";

interface IndexProps {
  info: User;
  token: string;
}

const TitansProOnsite: React.FC<IndexProps> = ({ info, token }) => {
  return (
    <MainLayout
      meta={{
        title: "Titans Pro Onsite",
        description: "Titans Pro Onsite",
        keywords: "Titans Pro Onsite",
      }}
      info={info}
      Title={
        <div className="flex my-10 justify-center flex-col items-center">
          <h1 className="text-[45px] mt-[20px] font-jsans flex justify-center items-center gap-3 mx-auto  font-extrabold text-center text-gray-900 sm:text-4xl">
            Titans{" "}
            <StarIcon strokeWidth={3} className="text-primary font-bold" /> Pro
            Web App
          </h1>
          <BySptButton />
        </div>
      }
      Body={<TitansProOnsitePage info={info} token={token} />}
    />
  );
};

export default TitansProOnsite;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  const { resolvedUrl } = context;
  if (!session) {
    return {
      redirect: {
        destination: `/login?next=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  if (session && session.token) {
    return getProfile(context, {
      token: session.token,
      pageData: null,
    });
  }
  return getProfile(context, {
    token: null,
    pageData: null,
  });
}
