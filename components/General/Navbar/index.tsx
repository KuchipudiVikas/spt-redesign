import React, { useState } from "react";
import Image from "next/image";
import BrandLogo from "@/public/favIcon.png";
import {
  ArrowRightIcon,
  BellIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { Button } from "../../ui/button";
import DotIcon from "@/public/assets/home/dot-svgrepo-com.svg";
import Link from "next/link";
import Resources from "./Resources";
import Solutions from "./Solutions";
import { User } from "@/lib/ts/types/user";
import Notifications from "./Notifications";
import Help from "./Help";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Account from "./Account";
import { useSession } from "next-auth/react";
import Search from "./search";
import Create from "./Create";

interface NavbarProps {
  info: User | undefined;
  logout: () => void;
  token: string;
}

const Navbar: React.FC<NavbarProps> = ({ info, logout, token }) => {
  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
        backdropFilter: "blur(10px)", // Blur effect
        WebkitBackdropFilter: "blur(10px)", // For Safari support
      }}
      className="fixed top-0 left-0 w-full px-24 py-3 flex items-center justify-between z-50"
    >
      <NavigationMenu
        style={{
          width: "99vw",
        }}
        className="w-full"
      >
        <NavigationMenuList
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className="w-[86vw]"
        >
          <div className="flex items-center">
            <NavigationMenuItem className="mr-3">
              <a href={"/"}>
                <img
                  src={
                    "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/favIcon.png"
                  }
                  alt="Brand Logo"
                  width={50}
                  height={50}
                />
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem value="tools">
              <NavigationMenuTrigger
                style={{
                  fontWeight: "bold",
                  background: "transparent",
                }}
              >
                Tools
              </NavigationMenuTrigger>
              <Solutions />
            </NavigationMenuItem>
            <NavigationMenuItem value="resources">
              <NavigationMenuTrigger
                style={{
                  fontWeight: "bold",
                  background: "transparent",
                }}
              >
                Resources
              </NavigationMenuTrigger>
              <Resources />
            </NavigationMenuItem>

            <NavigationMenuItem className="bg-transparent">
              <a href="/pricing" className="bg-transparent">
                <NavigationMenuLink
                  style={{
                    background: "transparent",
                    fontWeight: "bold",
                  }}
                  className={navigationMenuTriggerStyle()}
                >
                  Pricing
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent">
              <a href="/pricing" className="bg-transparent">
                <NavigationMenuLink
                  style={{
                    background: "transparent",
                    fontWeight: "bold",
                  }}
                  className={navigationMenuTriggerStyle()}
                >
                  Testimonials
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
          </div>

          {info && token ? (
            <div className="flex items-center gap-2">
              <Search />
              <NavigationMenuItem value="create">
                <NavigationMenuTrigger
                  style={{
                    fontWeight: "bold",
                    background: "transparent",
                  }}
                >
                  <div className="p-3 bg-primary rounded-full text-white px-4 font-bold">
                    Create
                  </div>
                </NavigationMenuTrigger>
                <Create />
              </NavigationMenuItem>
              <NavigationMenuItem value="help">
                <NavigationMenuTrigger
                  style={{
                    fontWeight: "bold",
                    background: "transparent",
                    width: "60px",
                  }}
                  className="flex items-center"
                >
                  <button className="px-5 py-2 text-black bg-white font-normal rounded-full">
                    <MessageCircleQuestionIcon className={` text-[16px] `} />
                  </button>
                </NavigationMenuTrigger>
                <Help />
              </NavigationMenuItem>
              <NavigationMenuItem value="notifications">
                <NavigationMenuTrigger
                  style={{
                    fontWeight: "bold",
                    background: "transparent",
                  }}
                >
                  <BellIcon className="text-black" />
                </NavigationMenuTrigger>
                {/* @ts-ignore */}
                <Notifications info={info} token={token} />
              </NavigationMenuItem>
              {info && <Account info={info} logout={logout} />}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a className="font-bold" href={"/login"}>
                <Button className="font-bold" variant={"ghost"}>
                  Login <ArrowRightIcon size={20} className="font-bold" />
                </Button>
              </a>
              <Button
                className="font-bold flex rounded-full"
                style={{
                  padding: "16px 25px",
                }}
              >
                <Image src={DotIcon} alt="Brand Logo" width={5} height={5} />
                Get Started
              </Button>
            </div>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
