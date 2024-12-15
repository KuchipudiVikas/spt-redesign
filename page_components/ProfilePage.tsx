import React from "react";
import { User } from "@/lib/ts/types/user";
import { useState } from "react";
import { format } from "date-fns";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ActivityDisplay from "@/components/Profile/ActivityGraph";
import StarIcon from "@/public/assets/onboarding/star.png";
import GrowthIcon from "@/public/assets/onboarding/growth.png";
import FireIcon from "@/public/assets/onboarding/fire.png";
import HowToModal from "@/components/Profile/HowToModal";
import LeaderBoard from "@/components/Profile/Leaderboard";
import StreakBoard from "@/components/Profile/StreakBoard";

import FacebookIcon from "@/public/assets/social/facebook.png";
import YoutubeIcon from "@/public/assets/social/youtube.png";
import InstagramIcon from "@/public/assets/social/instagram.png";
import TwitterIcon from "@/public/assets/social/twitter.png";
import WebsiteIcon from "@/public/assets/onboarding/internet.png";
import profile from "@/lib/api/profile";
import { PenIcon } from "lucide-react";

import usage from "@/lib/api/usage";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function getIconForDomain(domain: string): string {
  const iconMap: { [key: string]: string } = {
    Facebook: FacebookIcon.src,
    Instagram: InstagramIcon.src,
    Twitter: TwitterIcon.src,
    Youtube: YoutubeIcon.src,
    Website: WebsiteIcon.src,
  };

  return iconMap[domain];
}

type View = "profile" | "user";

interface SkillLevel {
  user_id: string;
  total_skill_level: number;
  tools: any[];
}

interface UserData {
  skill_level: SkillLevel;
  total_xp: number;
  user_id: string;
}

export interface SocialLink {
  domain: string;
  link: string;
}

export interface StreakData {
  current_streak: number;
  user_id: string;
}

export interface ProfileProps {
  info: User;
  token: string;
  view?: View;
}

const ProfilePage: React.FC<ProfileProps> = ({
  info,
  token,
  view = "profile",
}) => {
  const [loading, setLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [streakData, setStreakData] = useState<any>(null);
  const [totalXp, setTotalXp] = useState<number | null>(null);
  const [SkillLevel, setSkillLevel] = useState<number | null>(null);

  const formattedDate = format(new Date(info.createdAt), "MMMM dd, yyyy");

  async function fetchSocialLinks() {
    const { data, error } = await profile.get_social_links(info._id);
    if (error) {
      return console.error(error);
    }
    // @ts-ignore
    const links: SocialLink[] = data.links as SocialLink[];
    setSocialLinks(links || []);
  }

  async function getStreakData() {
    const { data, error } = await usage.get_current_streak(info._id);
    if (error) {
      return console.error(error);
    }

    const streak: StreakData = data as StreakData;
    setStreakData(streak.current_streak);
  }

  async function GetXpPoints() {
    const { data, error } = await usage.get_total_points(info._id);
    if (error) {
      return console.error(error);
    }
    const userData: UserData = data as UserData;
    setTotalXp(userData.total_xp || 0);
    setSkillLevel(userData.skill_level.total_skill_level || 0);
  }

  useEffect(() => {
    fetchSocialLinks();
    getStreakData();
    GetXpPoints();
  }, []);

  console.log("info image is", info.image);

  return (
    <div
      style={{
        marginTop: "80px",
      }}
      className="comp-container"
    >
      <div
        style={{
          gap: "30px",
        }}
        className="grid grid-cols-5"
      >
        <div className="col-span-3">
          <div
            style={{
              border: "2px solid #d5c5e4",
              borderRadius: "20px",
            }}
            className="bg-[#f7f6f8] relative"
          >
            <div
              style={{
                borderRadius: "20px",
              }}
              className="flex  gap-4  w-full  p-5  "
            >
              <Image
                src={info.image || "/assets/onboarding/league.png"}
                alt=""
                width={150}
                height={150}
                className="rounded-full"
              />

              <div
                style={{
                  marginLeft: "0px",
                }}
                className="flex  justify-center flex-col"
              >
                <div>
                  <h1
                    style={{
                      fontSize: "24px",
                    }}
                    className=" font-bold "
                  >
                    {info.username}
                  </h1>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "5px",
                    }}
                    className="flex  items-center"
                  >
                    <h1
                      style={{
                        fontSize: "16px",
                      }}
                      className=" font-normal text-gray-500"
                    >
                      {info.email}
                    </h1>
                    <h5
                      style={{
                        fontSize: "12px",
                        marginTop: "3px",
                      }}
                      className=" font-normal text-gray-500"
                    >
                      ( Joined {formattedDate} )
                    </h5>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  {socialLinks.map((link, index: number) => {
                    if (!link.link) {
                      return null;
                    }
                    return (
                      <Link href={link.link} target="__blank" key={index}>
                        <Image
                          src={getIconForDomain(link.domain)}
                          alt=""
                          width={100}
                          height={100}
                          className="w-[25px] h-auto"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
              {view == "profile" && (
                <Link href="/profile/settings">
                  <Button
                    variant="outline"
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                    }}
                    className="flex rounded-full absolute bg-primary text-white "
                  >
                    <PenIcon className="w-5 h-5" />
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>

            <div className="rounded-2xl p-5 pt-0 my-5 grid grid-cols-4 md:grid-cols-3 gap-5 ">
              <div
                style={{
                  border: "1px solid #ccc",
                }}
                className="flex gap-3 p-4 rounded-2xl bg-white  items-center"
              >
                <Image
                  src={FireIcon.src}
                  alt=""
                  width={50}
                  height={50}
                  className="my-auto w-[40px] h-auto"
                />{" "}
                <div className="flex flex-col">
                  <div className="text-[16px] font-bold">{streakData}</div>
                  <div className="text-[11px] text-gray-500">
                    {/* {streakData > 0 ? "Day's streak" : "Day streak"} */}
                    {"Day streak"}
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                }}
                className="flex gap-3 p-4 rounded-2xl  bg-white items-center"
              >
                <Image
                  src={GrowthIcon.src}
                  alt=""
                  width={50}
                  height={50}
                  className="my-auto w-[40px] h-auto"
                />{" "}
                <div className="flex flex-col">
                  <div className="text-[16px] font-bold">{SkillLevel}</div>
                  <div className="text-[11px] text-gray-500">Skill level</div>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                }}
                className="flex gap-3 p-4 rounded-2xl bg-white  items-center"
              >
                <Image
                  src={StarIcon.src}
                  alt=""
                  width={50}
                  height={50}
                  className="my-auto w-[40px] h-auto"
                />{" "}
                <div className="flex flex-col">
                  <div className="text-[16px] font-bold">{totalXp || 0}</div>
                  <div className="text-[11px] text-gray-500">Total XP</div>
                </div>
              </div>
              <HowToModal />
            </div>
          </div>

          <div
            style={{
              marginTop: "25px",
            }}
            className=""
          >
            <ActivityDisplay info={info} />
          </div>
        </div>

        {view == "profile" && (
          <div
            style={{
              gap: "30px",
            }}
            className="rounded-2xl px-5 col-span-2  grid grid-cols-1 gap-5 "
          >
            <StreakBoard info={info} user_id={info._id} token={token} />
            <LeaderBoard info={info} token={token} user_id={info._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
