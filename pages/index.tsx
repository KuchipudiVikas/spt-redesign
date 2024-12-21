import localFont from "next/font/local";
import Hero from "@/components/Home/Hero";
import MainLayout, { getProfile } from "@/components/Layout";
import Home, { HomeProps } from "@/page_components/Home";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Accounts from "../lib/mw/Accounts";
import { getSession } from "next-auth/react";

export default function Index({ pageData, info, token }: HomeProps) {
  return (
    <div className={` `}>
      <MainLayout
        Title={<Hero />}
        info={info}
        Body={<Home pageData={pageData} info={info} token={token} />}
        fullWidth={true}
        meta={{
          title: "Home - Self publishing titans",
          description:
            "Self publishing titans is a platform that provides tools and resources for authors to self publish their books.",
          keywords:
            "self publishing titans, self publish, self publishing, self publishing tools, self publishing resources, self publishing platform",
        }}
      />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const content = await Accounts.content.home();
    const feat = await Accounts.features.list({});

    const session = await getSession(context);

    let token = "";

    if (session) {
      token = session?.token;
    }

    return getProfile(context, {
      pageData: content.simple,
      features: feat.simple,
      token,
    }).catch((error) => {
      console.error("Error in getProfile: in pages/index.tsx:", error);
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    });
  } catch (e) {
    console.error("Error in getServerSideProps in pages/index.tsx:", e);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
