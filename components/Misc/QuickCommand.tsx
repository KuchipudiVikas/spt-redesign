import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import ToolSearchData, {
  SectionItem,
} from "../General/Navbar/search/searchData";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import React, { useEffect, useState } from "react";

const GlobalCommand = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [query, setQuery] = useState("");
  const [toolResults, setToolResults] = useState<SectionItem[]>([]);

  const filterData = (query: string) => {
    if (query === "") return setToolResults([]);

    const filteredResults = ToolSearchData.filter((item: SectionItem) =>
      item.item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setToolResults(filteredResults);
  };

  useEffect(() => {
    // filter the data tools data
    filterData(query);
  }, [query]);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={(value) => setQuery(value)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tools">
            {toolResults.map((item, index) => {
              return <CommandItem key={index}>{item.item}</CommandItem>;
            })}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default GlobalCommand;
