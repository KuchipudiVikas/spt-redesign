import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/ts/types/user";
import { Button } from "@/components/ui/button";
import { isOwned } from "@/utils/common";

import Link from "next/link";
import {
  UserIcon,
  ListIcon,
  BookIcon,
  DollarSignIcon,
  CopyIcon,
  LogOut,
  CrownIcon,
  FlameIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { StarIcon } from "lucide-react";
import usage from "@/lib/api/usage";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import useDelayedPopover from "@/hooks/useDelayedPopover";

interface AccountProps {
  info: User | false;
  logout: () => void;
  isMobile?: boolean;
}

const Account: React.FC<AccountProps> = ({ info, logout, isMobile }) => {
  const src = info && typeof info !== "boolean" ? info.image : "";

  const handleLogOutAll = () => {
    logout();
  };

  const affiliateData = useSelector(
    (state: RootState) => state.affiliate.affiliateData
  );

  const [userRank, setUserRank] = useState<number | null>(null);
  const [totalXp, setTotalXp] = useState<number | null>(null);
  const [streak, setStreak] = useState<number | null>(null);

  // @ts-ignore
  const user_id = info?._id;

  const fetchUserStat = async () => {
    if (!user_id) {
      return;
    }

    try {
      const rankData = await usage.get_user_rank("this_month" as any, user_id);
      // @ts-ignore
      setUserRank(rankData.data.rank);

      const xpData = await usage.get_total_points(user_id);
      // @ts-ignore
      setTotalXp(xpData.data.total_xp);

      const streadData = await usage.get_current_streak(user_id);
      // @ts-ignore
      setStreak(streadData.data.current_streak || 0);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserStat();
  }, [user_id]);

  const { isOpen, handleMouseEnter, handleMouseLeave } = useDelayedPopover(100);
  if (!info) return null;

  if (isMobile) {
    return (
      <div className="flex flex-row-reverse items-center bg-white pr-4 p-1 rounded-full">
        <div className="flex mr-2 gap-2 items-center">
          <StarIcon className="w-5 ml-2" />
          {totalXp || 0}
          <FlameIcon className="w-5 ml-1 mr-1" />
          {streak || 0}
        </div>
        <Avatar
          style={{
            width: "40px",
            height: "40px",
          }}
          className="cursor-pointer"
        >
          <AvatarImage className="" src={src} alt={info.username} />
          <AvatarFallback>{info?.username?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <NavigationMenuItem value="account">
      <Popover open={isOpen} onOpenChange={handleMouseLeave}>
        <PopoverTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: "transparent",
            // padding: "10px",
          }}
          className=""
        >
          <div className="flex items-center bg-white pl-4 p-1 rounded-full">
            <div className="flex mr-2 items-center">
              <StarIcon className="w-5 mr-1" />
              {totalXp || 0}
              <FlameIcon className="w-5 ml-1 mr-1" />
              {streak || 0}
            </div>
            <Avatar
              style={{
                width: "40px",
                height: "40px",
              }}
              className="cursor-pointer"
            >
              <AvatarImage className="" src={src} alt={info.username} />
              <AvatarFallback>{info?.username?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-80 p-2"
        >
          <div className="text-black  m-1 p-2 flex gap-2 items-center">
            <div className="flex gap-2 justify-between w-full items-center">
              <div className="flex gap-2 items-center">
                <Avatar className="cursor-pointer w-[70px] h-[70px]">
                  <AvatarImage src={info.image} alt={info.username} />
                  <AvatarFallback>{info?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="font-semibold mb-1">{info.username}</div>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#5d5d5d",
                      fontSize: "14px",
                    }}
                  >
                    {info.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 pt-0">
            <div className="text-black flex-col gap-1.5 flex text-gray-500 font-sans">
              {/* <Link href={"/profile"} className="flex gap-4 items-center">
              <FaRegUser className="" fontSize={16} />
              <span className="text-black text-gray-500 text-[15px]">
                Profile
              </span>
            </Link> */}
              <h6 className="font-bold text-black">General </h6>
              <Link
                href={"/profile"}
                className="flex gap-4 items-center justify-between sp-container rounded-md p-3"
              >
                <div className="flex gap-4  items-center">
                  <UserIcon className="w-5" fontSize={5} />
                  <span className="text-black text-gray-500 text-[15px]">
                    Profile
                  </span>
                </div>
                <ArrowRight className="w-4" />
              </Link>
              <Link
                href={"/me"}
                className="flex gap-4 items-center justify-between sp-container rounded-md p-3"
              >
                <div className="flex gap-4  items-center">
                  <ListIcon className="w-5" fontSize={5} />
                  <span className="text-black text-gray-500 text-[15px]">
                    Account
                  </span>
                </div>

                <ArrowRight className="w-4" />
              </Link>
              <Link
                href={"/book-planner"}
                className="flex gap-4 items-center justify-between sp-container rounded-md p-3"
              >
                <div className="flex gap-4  items-center">
                  <BookIcon className="w-5" style={{ fontSize: "16px" }} />
                  <span className="text-black text-gray-500 text-[15px]">
                    Notes & Planning
                  </span>
                </div>
                <ArrowRight className="w-4" />
              </Link>
            </div>
          </div>
          <UpgradeButton info={info} />
          <Separator className="mt-3" />

          <div className="flex-col gap-3 flex justify-start p-3 text-black text-gray-500 font-sans">
            <h6 className="text-black text-gray-500">
              Your Affiliate Dashboard
            </h6>

            <Link href={"/user/affiliate"} className="flex gap-4 items-center">
              <DollarSignIcon className="" style={{ fontSize: "16px" }} />
              <span className="text-black text-gray-500 text-[15px]">
                Affiliate Program
              </span>
            </Link>

            {affiliateData && (
              <Button
                variant="ghost"
                className="flex gap-4 justify-start items-center p-0 m-0"
                onClick={() => {
                  window.navigator.clipboard.writeText(
                    `https://affiliates.selfpublishingtitans.com/${affiliateData.affiliate_id}.html`
                  );
                }}
              >
                <CopyIcon className="" style={{ fontSize: "16px" }} />
                <span className="text-black text-gray-500 text-[15px] font-normal">
                  Copy My Link
                </span>
              </Button>
            )}

            {affiliateData && (
              <Link
                href={`https://affiliates.selfpublishingtitans.com/${affiliateData.affiliate_id}.html`}
                className="flex gap-4 items-center"
              >
                {/* <ContentCopyIcon className="" style={{ fontSize: "16px" }} /> */}
                <h6
                  style={{
                    fontSize: "12px",
                    color: "#5d5d5d",
                    textWrap: "wrap",
                    maxWidth: "200px",
                  }}
                  className=""
                >
                  https://affiliates.selfpublishingtitans.com/
                  {affiliateData.affiliate_id}.html
                </h6>
              </Link>
            )}
          </div>
          <div className="p-3">
            <div
              onClick={() => handleLogOutAll()}
              className="text-black cursor-pointer sp-container p-3 rounded-md flex-col gap-3 flex text-gray-500 font-sans"
            >
              <div className="flex gap-4 items-center">
                <LogOut className="w-5" fontSize={16} />
                <span className="text-black text-gray-500 text-[15px]">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </NavigationMenuItem>
  );
};

export default Account;

function UpgradeButton({ info }: { info: User }) {
  function NeedToUpgrade(): {
    upgradeTo: string;
    currentTier: string;
    show: boolean;
  } {
    try {
      if (!info || !info.features || !info.features.simple) {
        console.error("Invalid info structure");
        return {
          upgradeTo: "0",
          currentTier: "",
          show: false,
        };
      }

      const features = info.features.simple;

      if (isOwned(features, "64562adce2210da37f2bdb2a")) {
        return {
          upgradeTo: "Pro Max",
          currentTier: "Pro",
          show: true,
        };
      }
      if (isOwned(features, "6516aecf8a69c334783b3c27")) {
        return {
          upgradeTo: "Supreme",
          currentTier: "Pro Max",
          show: true,
        };
      }

      if (isOwned(features, "655ee43f1727b2465e13079b")) {
        return {
          upgradeTo: "Supreme",
          currentTier: "Supreme",
          show: false,
        };
      }

      return {
        upgradeTo: "Pro",
        currentTier: "Free",
        show: true,
      };
    } catch (error) {
      console.error("Error in NeedToUpgrade function:", error);
      return {
        upgradeTo: "",
        currentTier: "",
        show: false,
      };
    }
  }

  const isUpgrade = NeedToUpgrade();

  if (!isUpgrade.show) {
    return null;
  }

  return (
    <div
      style={{
        width: "280px",
      }}
      className=""
    >
      <Link href={"/pricing"} className="p-3 w-[100px]">
        <Button size="lg" className=" font-bold w-full mr-10">
          <CrownIcon className="ml-2" />
          Upgrade
        </Button>
      </Link>
    </div>
  );
}
