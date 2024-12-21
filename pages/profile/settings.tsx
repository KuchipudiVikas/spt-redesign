import React, { useState, useEffect } from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import Account from "@/lib/mw/Accounts";
import Accounts from "@/lib/mw/Accounts";
import { User } from "@/lib/ts/types/user";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { IoSettingsOutline } from "react-icons/io5";
import Profile from "@/components/Profile/settings/Profile";
import Social from "@/components/Profile/settings/Social";
import Preferences from "@/components/Profile/settings/Preferences";
import profile from "@/lib/api/profile";
import { GetServerSidePropsContext } from "next";
import { TPreferences } from "@/components/Profile/settings/Preferences";
import { UserIcon, LinkIcon, ListCheck } from "lucide-react";

type Tab = "profie" | "social_links" | "preferences";

interface SettingsProps {
  info: User;
  token: string;
  preferences: TPreferences;
}

type LoadingKey = "profile" | "social_links" | "preferences";

type LoadingType = {
  [key in LoadingKey]: boolean;
};

const Settings: React.FC<SettingsProps> = ({ info, token, preferences }) => {
  const [tab, setTab] = useState<Tab>("profie");

  const tabs = [
    {
      title: "Profile",
      key: "profie",
      icon: <UserIcon size={16} />,
    },
    {
      title: "Social Links",
      key: "social_links",
      icon: <LinkIcon size={16} />,
    },
    {
      title: "Preferences",
      key: "preferences",
      icon: <ListCheck size={16} />,
    },
  ];

  return (
    <>
      <Head>
        <title>Profile Settings</title>
      </Head>
      <MainLayout
        meta={{
          title: "Profile Settings",
          description: "Profile Settings",
          keywords: "Profile Settings",
        }}
        info={info}
        Title={<></>}
        Body={
          <div className="md:px-24 pt-10 comp-container font-sans w-full min-h-[80vh] my-10">
            <div className="font-semibold flex items-center text-3xl gap-2">
              <div className="sp-container w-full p-6 border rounded-2xl light-border">
                <h5 className="text-primary font-bold mx-auto w-fit text-[45px]">
                  Profile Settings
                </h5>
                <div className="flex md:flex-row flex-col items-center w-fit mx-auto mt-10 gap-5  ">
                  {tabs.map((t) => (
                    <div
                      style={{
                        borderBottom:
                          tab === t.key
                            ? "3px solid #690ecd"
                            : "3px solid transparent",
                      }}
                      key={t.key}
                      className={`cursor-pointer text-[20px] ${
                        tab === t.key
                          ? "text-black font-semibold"
                          : "text-black font-medium"
                      } p-1  flex items-center gap-2`}
                      onClick={() => setTab(t.key as Tab)}
                    >
                      {t.icon}
                      {t.title}
                    </div>
                  ))}
                </div>
                <div className="">
                  {tab === "profie" && <Profile token={token} />}
                  {tab === "social_links" && <Social info={info} />}
                  {tab === "preferences" && (
                    <Preferences info={info} preferences={preferences} />
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Settings;

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    const info = await Account.getInfo(session.token);
    const { data, error } = await profile.get_profile_preferences(
      info.full.data._id
    );

    return getProfile(context, {
      pageData: content.simple,
      features: feat.simple,
      token: session.token,
      preferences: data,
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
