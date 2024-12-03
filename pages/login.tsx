import React from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import LoginPage from "@/page_components/Auth/Login";
import Accounts from "@/lib/mw/Accounts";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const Login = () => {
  return (
    <MainLayout
      title="Login - Self Publishing Titans"
      description="Login to Self Publishing Titans"
      keywords="login, self publishing titans"
      Title={<></>}
      Body={<LoginPage />}
    />
  );
};

export default Login;
