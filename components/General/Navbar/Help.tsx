import React, { useRef, useState, useEffect } from "react";
import {
  Bug,
  GitPullRequestArrow,
  Group,
  MessageSquareIcon,
  Youtube,
} from "lucide-react";

import { NavigationMenuContent } from "@/components/ui/navigation-menu";

interface ICreateProps {}

const Create: React.FC<ICreateProps> = ({}) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <NavigationMenuContent>
      <div
        ref={divRef}
        style={{
          width: "300px",
          border: "none",
        }}
        className="relative text-black p-3  inline-block text-left"
      >
        {
          <div>
            <h4 className="font-sans  p-3 pt-0 font-bold  pb-2  text-md text-[18px]">
              Help
            </h4>
            <div className="flex flex-col  mt-1">
              <a
                href="https://selfpublishingtitans.com/support"
                target="__blank"
                className=" my-1  p-2 py-4 sp-container rounded-md flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
              >
                <MessageSquareIcon className="mr-3 w-4 text-primary" />
                Support
              </a>
              <a
                href="https://selfpublishingtitans.com/support"
                target="__blank"
                className=" my-1  p-2 py-4 sp-container rounded-md flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
              >
                <GitPullRequestArrow className="mr-3 w-4 text-primary" />
                Feature Request
              </a>
              <a
                target="__blank"
                href="https://selfpublishingtitans.com/support"
                className=" my-1  p-2 py-4 rounded-md sp-container flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
              >
                <Bug className="mr-3 w-4 text-primary" />
                Bug Report
              </a>

              <a
                href="https://community.selfpublishingtitans.com/"
                target="__blank"
                className=" my-1  p-2 py-4 sp-container rounded-md flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
              >
                <Group className="mr-3 w-4 text-primary" />
                Community
              </a>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    "https://www.youtube.com/@SelfPublishingTitans",
                    "_blank"
                  );
                }}
                className=" my-1 sp-container p-2 py-4 rounded-md flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
              >
                <Youtube className="mr-3 w-4 text-primary" />
                Tutorials
              </button>
            </div>
          </div>
        }
      </div>
    </NavigationMenuContent>
  );
};

export default Create;
