import React from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import LoginPage from "@/page_components/Auth/Login";
import Accounts from "@/lib/mw/Accounts";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

interface LoginProps {}

const Login = () => {
  return (
    <MainLayout
      meta={{
        title: "Login - Self Publishing Titans",
        description: "",
        keywords: "",
      }}
      info={undefined}
      Title={<></>}
      Body={<LoginPage />}
    />
  );
};

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
