import React from "react";
import Image from "next/image";
import ChromeExtensionIcon from "@/public/assets/logos/chrome_store.png";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaChrome } from "react-icons/fa";
import useDelayedPopover from "@/hooks/useDelayedPopover";

interface ChromeExtensionProps {
  isMobile?: boolean;
}

const ChromeExtension: React.FC<ChromeExtensionProps> = ({ isMobile }) => {
  const { isOpen, handleMouseEnter, handleMouseLeave } = useDelayedPopover(100);

  const extensionLinks = [
    {
      href: "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
      label: "Titans Pro",
    },
    {
      href: "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
      label: "Titans Quick View - Pro Search Results Data",
    },
  ];

  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          style={{
            borderBottom: "none",
          }}
          value="chrome-extension"
        >
          <AccordionTrigger className="flex items-center gap-2">
            <div className="flex  items-center">
              <Image
                src={ChromeExtensionIcon}
                alt="Brand Logo"
                width={34}
                height={34}
                className="mr-4 w-6"
                style={{
                  borderRadius: "5px",
                }}
              />
              <span className="font-bold text-black">Chrome Extensions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 bg-white rounded-xl p-3">
              {extensionLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  passHref
                  className="p-3 sp-container font-bold flex items-center rounded-xl"
                >
                  <FaChrome className="mr-2 text-primary" />
                  {link.label}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div>
      <Popover open={isOpen} onOpenChange={handleMouseLeave}>
        <PopoverTrigger
          style={{
            background: "transparent",
            width: "fit-content",
            padding: "0",
          }}
          className="nav-menu-trigger"
        >
          <Image
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            src={ChromeExtensionIcon}
            alt="Brand Logo"
            width={34}
            height={34}
            style={{
              borderRadius: "5px",
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          style={{
            width: "300px",
            border: "none",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white flex flex-col gap-2 rounded-xl">
            {extensionLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                passHref
                className="p-3 sp-container font-bold flex items-center rounded-xl"
              >
                <FaChrome className="mr-2 text-primary" />
                {link.label}
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChromeExtension;
