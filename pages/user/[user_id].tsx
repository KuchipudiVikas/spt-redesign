import React, { useEffect } from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import Account from "@/lib/mw/Accounts";
import Accounts from "@/lib/mw/Accounts";
import { getSession } from "next-auth/react";
import { User } from "@/lib/ts/types/user";
import { getRequest } from "@/lib/api/interface";
import { decryptString } from "@/utils/crypto";
import ProfilePage from "@/page_components/ProfilePage";

interface UserProfileProps {
  info: User;
  user_id: string;
  token: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ info, user_id, token }) => {
  const [userInfo, setUserInfo] = React.useState<User | null>(null);
  async function getUserInfoById() {
    const url =
      process.env.NEXT_PUBLIC_SERVER_URL + "/api/account/info/" + user_id;

    const { data, error } = await getRequest(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    // @ts-ignore
    setUserInfo(data.data as TUser);
  }

  useEffect(() => {
    getUserInfoById();
  }, []);

  if (!userInfo) {
    return (
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "100vh",
      //   width: "100vw",
      // }}
      >
        Loading...
      </div>
    );
  }

  return (
    <MainLayout
      meta={{
        title: `${userInfo.username} - Self Publishing Titans`,
        description: `Profile page for ${userInfo.username}`,
        keywords: "profile",
      }}
      Title={<></>}
      info={info}
      Body={
        <div className="text-black min-h-[87vh] mt-10 max-w-[98vw] md:max-w-[1000px] mx-auto">
          <ProfilePage token={token} view="user" info={userInfo} />
        </div>
      }
    />
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  try {
    const content = await Account.content.home();
    const feat = await Accounts.features.list({});

    const { resolvedUrl } = context;

    const session: any = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: `/auth/login?next=${encodeURIComponent(resolvedUrl)}`,
          permanent: false,
        },
      };
    }

    const user_id = context.params.user_id;
    const decryptedString = await decryptString(user_id);

    return getProfile(context, {
      pageData: content.simple,
      features: feat.simple,
      user_id: decryptedString,
      // user_id: user_id,
      token: session.token,
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
