import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/ts/types/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  UserIcon,
  ListIcon,
  BookIcon,
  DollarSignIcon,
  CopyIcon,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";

interface AccountProps {
  info: User;
  logout: () => void;
}

const Account: React.FC<AccountProps> = ({ info, logout }) => {
  const src = info?.image ? info?.image : "";

  const handleLogOutAll = () => {
    logout();
  };

  if (!info) return null;

  return (
    <NavigationMenuItem value="account">
      <NavigationMenuTrigger
        style={{
          backgroundColor: "transparent",
          width: "40px",
        }}
        className="flex items-center"
      >
        <Avatar className="cursor-pointer">
          <AvatarImage src={src} alt={info.username} />
          <AvatarFallback>{info.username.charAt(0)}</AvatarFallback>
        </Avatar>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="w-80 p-2">
        <div className="text-black  m-1 p-2 flex gap-2 items-center">
          <div className="flex gap-2 justify-between w-full items-center">
            <div className="flex gap-2 items-center">
              <Avatar className="cursor-pointer w-[70px] h-[70px]">
                <AvatarImage src={info.image} alt={info.username} />
                <AvatarFallback>{info.username.charAt(0)}</AvatarFallback>
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
        <div className="p-3">
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
              className="flex gap-4 items-center sp-container rounded-md p-3"
            >
              <UserIcon className="w-5" fontSize={5} />
              <span className="text-black text-gray-500 text-[15px]">
                Profile
              </span>
            </Link>
            <Link
              href={"/auth/me"}
              className="flex gap-4 items-center sp-container rounded-md p-3"
            >
              <ListIcon className="w-5" fontSize={5} />
              <span className="text-black text-gray-500 text-[15px]">
                Account
              </span>
            </Link>
            <Link
              href={"/book-planner"}
              className="flex gap-4 items-center sp-container rounded-md p-3"
            >
              <BookIcon className="w-5" style={{ fontSize: "16px" }} />
              <span className="text-black text-gray-500 text-[15px]">
                Notes & Planning
              </span>
            </Link>
          </div>
        </div>
        {/* <Upgrade info={info} isUpgrade={isUpgrade} /> */}
        {/* {!isUpgrade.show && <hr />} */}
        <Separator />
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
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Account;
