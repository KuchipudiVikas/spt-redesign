import React from "react";
import Image from "next/image";
import ChromeExtensionIcon from "@/public/assets/logos/chrome_store.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaChrome } from "react-icons/fa";

import {
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ChromeExtension = () => {
  return (
    <div>
      {" "}
      <NavigationMenuItem value="chrome">
        <NavigationMenuTrigger
          style={{
            background: "transparent",
            width: "fit-content",
            padding: "0",
          }}
          className="nav-menu-trigger"
        >
          <Image
            src={ChromeExtensionIcon}
            alt="Brand Logo"
            width={34}
            height={34}
            style={{
              borderRadius: "5px",
            }}
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          style={{
            width: "400px",
            border: "none",
          }}
        >
          <div className="p-4 bg-white flex flex-col gap-2 rounded-xl ">
            <Link href="https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid">
              <div className="p-3 sp-container flex items-center font-bold rounded-xl">
                <FaChrome className="mr-2 text-primary" />
                Titans Pro
              </div>
            </Link>
            <Link
              href="https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece"
              passHref
              className="p-3 sp-container font-bold flex items-center rounded-xl "
            >
              {" "}
              <FaChrome className="mr-2 text-primary" />
              Titans Quick View - Pro Search Results Data
            </Link>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </div>
  );
};

export default ChromeExtension;
