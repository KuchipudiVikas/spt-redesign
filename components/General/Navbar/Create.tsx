import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import StartIcon from "@/public/assets/onboarding/rocket.png";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  ResearchOptions,
  CreateOptions,
  BookListingTools,
  GeneralTools,
  LearningTools,
} from "./CreateData";

import useDelayedPopover from "@/hooks/useDelayedPopover";

interface SectionProps {
  title: string;
  options: any[];
  gridCols?: number;
  withTags?: boolean;
}

const ToolSection: React.FC<SectionProps> = ({
  title,
  options,
  withTags = false,
  gridCols = 1,
}) => {
  return (
    <div>
      <h6 className="text-black mb-3 mt-4 font-bold">{title}</h6>
      <div className={`w-full grid grid-cols-${gridCols} gap-2`}>
        {options.map((option, index) => (
          <a
            style={{
              minHeight: "55px",
            }}
            key={index}
            href={option.link}
            target="__blank"
            className="flex items-center border h-full p-3 rounded-lg py-0 text-sm text-gray-700 hover:bg-gray-100 px-3"
            role="menuitem"
            onClick={(e) => e.stopPropagation()}
          >
            <option.Icon
              className="mr-3 text-primary"
              style={{ width: "20px", height: "20px" }}
            />
            <div>
              <h6 className="font-semibold text-black">{option.name}</h6>
              {withTags && option.tag && (
                <p className="line-clamp-2 text-[12px] leading-snug text-muted-foreground">
                  {option.tag}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

interface CreateProps {
  isMobile?: boolean;
}

const Create: React.FC<CreateProps> = ({ isMobile }) => {
  const { isOpen, handleMouseEnter, handleMouseLeave } = useDelayedPopover(100);

  const sections = [
    { title: "Research", options: ResearchOptions, withTags: true },
    { title: "Create", options: CreateOptions },
    { title: "Book Listing", options: BookListingTools },
    { title: "General", options: GeneralTools },
    { title: "Education", options: LearningTools },
  ];

  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          style={{
            borderBottom: "none",
          }}
          className="py-0"
          value="tools"
        >
          <AccordionTrigger className="text-black py-0  font-bold">
            <div className="flex items-center">
              <Image
                src={StartIcon}
                alt="Brand Logo"
                className="mr-4 w-6"
                width={25}
                height={25}
              />
              Start
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="w-full">
              {sections.map((section, index) => (
                <AccordionItem key={index} value={section.title}>
                  <AccordionTrigger className="flex justify-between items-center w-full py-3 rounded-lg font-medium text-black">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="mt-4">
                    <ToolSection
                      title={section.title}
                      options={section.options}
                      withTags={section.withTags}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={handleMouseLeave}>
      <PopoverTrigger
        style={{
          fontWeight: "bold",
          padding: "0px 10px",
          color: "white",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="nav-menu-trigger bg-primary rounded-full"
      >
        <div
          style={{
            height: "35px",
          }}
          className="h-full flex items-center font-bold"
        >
          Start
        </div>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: "1200px", maxHeight: "80vh", overflow: "auto" }}
        className="right-aligned"
      >
        <div className="text-black mr-2 inline-block text-left">
          <div className="p-5 pt-0 w-full">
            <div style={{ background: "white" }}>
              <div
                className="py-1 p-3"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="grid grid-cols-1 w-full w-[500px]">
                  {sections.map((section, index) => (
                    <React.Fragment key={index}>
                      <ToolSection
                        title={section.title}
                        options={section.options}
                        withTags={section.withTags}
                        gridCols={5}
                      />
                      {index < sections.length - 1 && <hr className="mt-6" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Create;
