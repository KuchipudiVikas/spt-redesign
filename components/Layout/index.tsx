import React from "react";
import Header from "./Header";
import Head from "next/head";
import Footer from "./Footer";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Account from "../../lib/mw/Accounts";
import { User } from "@/lib/ts/types/user";

interface Meta {
  title: string;
  description: string;
  keywords: string;
}

interface MainLayoutProps {
  Title: React.ReactNode;
  Body: React.ReactNode;

  showFooter?: boolean;
  info: User;
  meta: Meta;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  Title,
  Body,
  showFooter = true,
  meta = {
    title: "",
    description: "",
    keywords: "",
  },
}) => {
  const isBookCoverPage = meta.title == "Book Cover Creator for KDP";

  return (
    <div>
      <Head>
        <title> {meta.title} </title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <Header>{Title}</Header>
      <div
        className={`min-h-[60vh] mx-auto ${
          !isBookCoverPage && "max-w-[1300px]"
        }`}
      >
        {Body}
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;

export const getProfile = async (
  context: GetServerSidePropsContext,
  otherRetVal = {},
  redirectOnNoAccount = false
) => {
  const { req, resolvedUrl } = context;
  const session: any = await getSession(context);

  let info: any = false;
  let has_past_due = false;

  if (session) {
    if (session.token) {
      const res = await Account.features.checkPastDue(session.token);
      if (res.status === 200) {
        has_past_due = true;
      }
    }
    info = await Account.getInfo(session.token);
    info.full.data["has_past_due"] = has_past_due;
    const featuresOwned = await Account.features.checkAll(session.token);
    info.full.data["features"] = featuresOwned;
  } else if (redirectOnNoAccount) {
    return {
      redirect: {
        destination: "/auth/login?next=" + resolvedUrl,
        permanent: false,
      },
    };
  }

  return {
    props: {
      info: info ? info.full.data : false,
      ...otherRetVal,
    },
  };
};
