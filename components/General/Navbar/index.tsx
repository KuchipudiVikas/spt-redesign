import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  MenuIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { Button } from "../../ui/button";
import DotIcon from "@/public/assets/home/dot-svgrepo-com.svg";
import Resources from "./Resources";
import Solutions from "./Solutions";
import { User } from "@/lib/ts/types/user";
import Notifications from "./Notifications";
import Help from "./Help";
import ChromeExtension from "./ChromeExtension";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileMenu from "./MobileMenu";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Account from "./Account";
import Search from "./search";
import Create from "./Create";

interface NavbarProps {
  info: User | false;
  logout: () => void;
  token: string;
}

const Navbar: React.FC<NavbarProps> = ({ info, logout, token }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      className="fixed top-0 left-0 w-full px-[4vw] py-3 flex items-center justify-between z-50"
    >
      {isDesktop ? (
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
                <NavigationMenuLink
                  href="/"
                  className="flex items-center justify-center"
                  style={{ minWidth: "50px" }}
                >
                  <img
                    src={
                      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/favIcon.png"
                    }
                    alt="Brand Logo"
                    className="w-14 h-auto"
                  />
                </NavigationMenuLink>
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
                <Search />
                <ChromeExtension />
                <NavigationMenuItem value="create">
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
      ) : (
        <MobileMenu token={token} info={info} logout={logout} />
      )}
    </div>
  );
};

export default Navbar;
