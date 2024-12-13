import React from "react";
import MainLayout from "@/components/Layout";
import RegisterPage from "@/page_components/Auth/RegisterPage";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const Register = () => {
  return (
    <MainLayout
      meta={{
        title: "Register - Self Publishing Titans",
        description: "",
        keywords: "",
      }}
      info={undefined}
      Title={<></>}
      Body={<RegisterPage />}
    />
  );
};

export default Register;

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
