import React from "react";
import SolutionsData from "@/data/solutionsData";
import { useState } from "react";
import { TSolutionsData } from "@/data/solutionsData";
import ListItem from "./ListItem";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { NavigationMenuContent } from "@/components/ui/navigation-menu";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface SolutionsProps {
  isMobile?: boolean;
}

const Solutions: React.FC<SolutionsProps> = ({ isMobile }) => {
  const [selectedCategory, setSelectedCategory] = useState<TSolutionsData>(
    SolutionsData[0]
  );

  const handleCategoryClick = (category: TSolutionsData) => {
    setSelectedCategory(category);
  };

  const flattenedItems = selectedCategory.Categories.flatMap(
    (category) => category.Items
  );

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryChange = (value: string) => {
    // Toggle expansion if the same category is clicked again
    setExpandedCategory((prev) => (prev === value ? null : value));
  };

  if (isMobile) {
    return (
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            style={{
              borderBottom: "none",
            }}
            value="tools"
          >
            <AccordionTrigger className="flex text-[16px] justify-between items-center w-full py-0 rounded-lg font-semibold text-black">
              Tools
            </AccordionTrigger>
            <AccordionContent className="mt-2 space-y-2">
              {SolutionsData.map((category: TSolutionsData, index) => (
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                  className="w-full"
                  value={
                    expandedCategory === category.Title ? category.Title : null
                  }
                  onValueChange={() => handleCategoryChange(category.Title)}
                >
                  <AccordionItem value={category.Title}>
                    <AccordionTrigger className="flex justify-between items-center w-full py-3 px-4 rounded-lg font-medium text-black">
                      {category.Title}
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 mt-2 space-y-2">
                      {category.Categories.flatMap((cat) =>
                        cat.Items.map((item) => (
                          <Link
                            key={item.heading}
                            href={item.link}
                            target={item.newTab ? "_blank" : "_self"}
                            className={cn(
                              "block select-none space-y-1 h-fit rounded-md p-3 sp-container-nav-list-item light-border border leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent flex-wrap focus:text-accent-foreground"
                            )}
                          >
                            <div className="flex gap-3">
                              {item.icon && (
                                <item.icon
                                  style={{
                                    width: "20px",
                                    strokeWidth: "2",
                                  }}
                                  className="text-primary"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium leading-none">
                                  {item.heading}
                                </div>
                                <p className="text-sm line-clamp-2 mt-1 leading-snug text-muted-foreground">
                                  {item.tag}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
              <Link
                href={"/tools"}
                target={true ? "_blank" : "_self"}
                className={cn(
                  "block select-none space-y-1 h-fit rounded-md p-3 sp-container-nav-list-item light-border border leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent flex-wrap focus:text-accent-foreground"
                )}
              >
                <div className="flex gap-3">
                  <div>
                    <div className="text-sm font-medium leading-none">
                      {"See & Compare All Tools"}
                    </div>
                    <p className="text-sm line-clamp-2 mt-1 leading-snug text-muted-foreground">
                      {"See all we provide to find what you need."}
                    </p>
                  </div>
                  <ArrowRight className="my-auto text-primary" />
                </div>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <NavigationMenuContent>
      <div className="flex p-5">
        <div className="">
          {" "}
          <div className="flex flex-col w-[240px]">
            {SolutionsData.map((category: TSolutionsData, index: number) => (
              <div
                key={index}
                className={`flex rounded-xl py-4 px-2 my-1 justify-between items-center text-black cursor-pointer ${
                  selectedCategory.Title === category.Title
                    ? "bg-[#690ecd] text-white"
                    : "bg-[#f7f6f8]"
                } category-`}
                onMouseEnter={() => handleCategoryClick(category)}
              >
                <div className="flex gap-3 w-full items-center">
                  <div
                    style={{
                      color:
                        selectedCategory.Title === category.Title
                          ? "#6902cd"
                          : "black",
                      backgroundColor:
                        selectedCategory.Title === category.Title
                          ? "#fff"
                          : "#fff",
                    }}
                    className="p-2 rounded-full"
                  >
                    <category.icon
                      style={{
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <h6 className="font-bold">{category.Title}</h6>
                    <ChevronRight
                      className={`w-4 font-bold ${
                        selectedCategory.Title === category.Title
                          ? "text-white"
                          : "text-black"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[400px] ml-4 md:w-[500px] lg:w-[600px]">
          <h6 className="font-bold  pl-4">{selectedCategory.Title}</h6>
          <ul className="grid   gap-3 p-4 md:grid-cols-2  w-full">
            {flattenedItems.map((item) => (
              <ListItem
                key={item.heading}
                title={item.heading}
                // @ts-ignore
                newTab={item.newTab}
                href={item.link}
                Icon={item.icon}
              >
                {item.tag}
              </ListItem>
            ))}
            <Link
              href={"/tools"}
              target={true ? "_blank" : "_self"}
              className={cn(
                "block select-none space-y-1 h-fit rounded-md p-3 sp-container-nav-list-item light-border border leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent flex-wrap focus:text-accent-foreground",
                "className"
              )}
            >
              <div className="flex gap-3 ">
                <div className="">
                  <div className="text-sm font-medium leading-none">
                    {"See & Compare All Tools"}
                  </div>
                  <p className="text-sm line-clamp-2 mt-1 leading-snug text-muted-foreground">
                    {"See all we provide to find what you need."}
                  </p>
                </div>
                <ArrowRight className="my-auto text-primary" />
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </NavigationMenuContent>
  );
};

export default Solutions;
