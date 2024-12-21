import React, { useRef, useState, useEffect } from "react";
import {
  Bug,
  GitPullRequestArrow,
  Group,
  MessageSquareIcon,
  Youtube,
} from "lucide-react";
import QuestionIcon from "@/public/assets/onboarding/question.png";
import Image from "next/image";

import { NavigationMenuContent } from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface ICreateProps {
  isMobile?: boolean;
}

const Create: React.FC<ICreateProps> = ({ isMobile = false }) => {
  const divRef = useRef<HTMLDivElement>(null);

  if (isMobile) {
    return (
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            style={{
              borderBottom: "none",
            }}
            value="help"
          >
            <AccordionTrigger className="flex items-center justify-between py-0  rounded-md bg-white">
              <span className="flex items-center font-semibold">
                <Image
                  src={QuestionIcon.src}
                  width={34}
                  height={34}
                  alt=""
                  className="mr-4 w-6"
                />
                Help
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col p-3">
                <a
                  href="https://selfpublishingtitans.com/support"
                  target="_blank"
                  className="my-1 p-2 rounded-md flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
                >
                  <GitPullRequestArrow className="mr-3 w-4 text-primary" />
                  Feature Request
                </a>
                <a
                  target="_blank"
                  href="https://selfpublishingtitans.com/support"
                  className="my-1 p-2 rounded-md flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
                >
                  <Bug className="mr-3 w-4 text-primary" />
                  Bug Report
                </a>
                <a
                  href="https://community.selfpublishingtitans.com/"
                  target="_blank"
                  className="my-1 p-2 rounded-md flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
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
                  className="my-1 p-2 rounded-md flex items-center hover:text-gray-900 font-sans font-medium text-md text-[14.6px]"
                >
                  <Youtube className="mr-3 w-4 text-primary" />
                  Tutorials
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

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
