import React from "react";
import ListItem from "./ListItem";
import ResourcesData from "../../../data/ResourcesData";
import { useState } from "react";
import { TResourcesData } from "../../../data/ResourcesData";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Resources = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [tab, setTab] = React.useState("Resources");
  const [selectedCategory, setSelectedCategory] = useState<TResourcesData>(
    ResourcesData[0]
  );

  const flattenedItems = selectedCategory.Categories.flatMap(
    (category) => category.Items
  );

  if (isMobile) {
    return (
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            style={{
              borderBottom: "none",
            }}
            value={selectedCategory.Title}
          >
            <AccordionTrigger className="flex text-[16px] justify-between items-center w-full py-0 rounded-lg font-semibold text-black">
              {selectedCategory.Title}
            </AccordionTrigger>
            <AccordionContent className="mt-4 space-y-2">
              <ul className="grid gap-3 p-4">
                {flattenedItems.map((item) => (
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
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <NavigationMenuContent>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        {flattenedItems.map((item) => {
          console.log("item is", item);
          return (
            // @ts-ignore
            <ListItem
              key={item.heading}
              // @ts-ignore
              Icon={item.icon}
              title={item.heading}
              href={item.link}
            >
              {item.tag}
            </ListItem>
          );
        })}
      </ul>
    </NavigationMenuContent>
  );
};

export default Resources;
