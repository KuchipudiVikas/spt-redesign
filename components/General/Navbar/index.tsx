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
import { User, UserData } from "@/lib/ts/types/user";
import Notifications from "./Notifications";
import Help from "./Help";
import ChromeExtension from "./ChromeExtension";

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
import Search from "./search";
import Create from "./Create";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

interface NavbarProps {
  info: User | false;
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
      className="fixed top-0 left-0 w-full px-[4vw] py-3 flex items-center justify-between z-50"
    >
      <NavigationMenu
        style={{
          width: "100vw",
        }}
        className="w-full"
      >
        <NavigationMenuList
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "92vw",
            // padding: "0 24px",
          }}
          className=""
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
              <NavigationMenuLink
                style={{
                  background: "transparent",
                  fontWeight: "bold",
                }}
                href="/pricing"
                className={navigationMenuTriggerStyle()}
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent">
              <NavigationMenuLink
                style={{
                  background: "transparent",
                  fontWeight: "bold",
                }}
                href="/testimonials"
                className={navigationMenuTriggerStyle()}
              >
                Testimonials
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>

          {info && token ? (
            <div className="flex items-center gap-2">
              {/* <NavigationMenuItem value="question">
                <NavigationMenuLink
                  style={{
                    height: "35px",
                  }}
                  // className="border rounded-3xl mr-2  px-3 flex font-medium items-center prim-outline-btn  text-[14px]"
                  className="border rounded-3xl mr-2  px-3 flex font-medium items-center prim-outline-btn  text-[14px]"
                >
                  Ask
                  <QuestionMarkIcon className="ml-2" />
                </NavigationMenuLink>
              </NavigationMenuItem> */}
              <Search />

              <ChromeExtension />
              <NavigationMenuItem value="create">
                <NavigationMenuTrigger
                  style={{
                    fontWeight: "bold",
                    background: "#d2b2f2",
                    padding: "0px 10px",
                  }}
                  className="nav-menu-trigger    rounded-full"
                >
                  <div
                    style={{
                      height: "35px",
                    }}
                    className=" h-full flex items-center font-bold"
                  >
                    Start
                  </div>
                </NavigationMenuTrigger>
                <Create />
              </NavigationMenuItem>
              <NavigationMenuItem value="help">
                <NavigationMenuTrigger
                  style={{
                    fontWeight: "bold",
                    background: "white",
                    width: "70px",
                  }}
                  className="flex rounded-full  items-center nav-menu-trigger"
                >
                  <MessageCircleQuestionIcon
                    style={{
                      height: "30px",
                    }}
                    className={`  `}
                  />
                </NavigationMenuTrigger>
                <Help />
              </NavigationMenuItem>
              <NavigationMenuItem value="notifications">
                <NavigationMenuTrigger
                  style={{
                    fontWeight: "bold",
                    background: "transparent",
                  }}
                  className="nav-menu-trigger flex items-center"
                >
                  <BellIcon
                    style={{
                      height: "38px",
                    }}
                    width={22}
                    className=""
                  />
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
