import React from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import LoginPage from "@/page_components/Auth/Login";
import Accounts from "@/lib/mw/Accounts";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const Login = () => {
  return (
    <MainLayout
      meta={{
        title: "Login - Self Publishing Titans",
        description: "",
        keywords: "",
      }}
      Title={<></>}
      Body={<LoginPage />}
    />
  );
};

export default Login;
