import React from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import ProfilePage, { ProfileProps } from "@/page_components/ProfilePage";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { User } from "@/lib/ts/types/user";

const Profile: React.FC<ProfileProps> = ({ info, token }) => {
  console.log("info", info, "token is ", token);

  return (
    <MainLayout
      title="Profile - Self Publishing Titans"
      description="Profile page for Self Publishing Titans"
      keywords="profile"
      Title={<></>}
      Body={<ProfilePage info={info} token={token} />}
    />
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return getProfile(context, {
    // @ts-ignore
    token: session.token,
  }).catch((error: any) => {
    console.log("error in getProfile", error);
  });
}

export default Profile;
