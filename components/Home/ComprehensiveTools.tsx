import React from "react";
import {
  SearchIcon,
  BookOpenText,
  BookHeart,
  LayoutList,
  BookCopy,
  PuzzleIcon,
  BrushIcon,
  NotebookPen,
  NotepadText,
  ExternalLinkIcon,
} from "lucide-react";
import LinkIndex from "@/lib/linkIndex";
import Link from "next/link";

type item = {
  title: string;
  icon: React.ReactNode;
  link: string;
  newTab?: boolean;
};

const items: item[] = [
  {
    title: "Find Hot Niches",
    icon: (
      <SearchIcon
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.TITANS_PRO,
  },
  {
    title: "Write a Book",
    icon: (
      <BookOpenText
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.BOOK_WRITER,
  },
  {
    title: "Create Book Cover",
    icon: (
      <BookHeart
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.KDP_COVER_TEMPLATE_GENERATOR,
  },
  {
    title: "A+ Content Template",
    icon: (
      <LayoutList
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.A_PLUS_CONTENT_TEMPLATE,
  },
  {
    title: "Low Content Books",
    icon: (
      <BookCopy
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.LOW_CONTENT_BOOK_GENERATOR,
  },
  {
    title: "Create Puzzles",
    icon: (
      <PuzzleIcon
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.PUZZLE_MAKER,
  },
  {
    title: "Coloring Books",
    icon: (
      <BrushIcon
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.COLORING_BOOKS,
  },
  {
    title: "Book Title Tool",
    icon: (
      <NotebookPen
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.BOOK_TITLE_CREATOR,
  },
  {
    title: "Book Description Tool",
    icon: (
      <NotepadText
        className="text-primary "
        style={{
          width: "26px",
          height: "26px",
        }}
      />
    ),
    link: LinkIndex.BOOK_DESCRIPTION_CREATOR,
  },
];

const ComprehensiveTools = () => {
  return (
    <div className="w-full">
      <div
        className="font-jsans flex justify-center mb-10 mt-[55px] mx-auto flex gap-3 font-extrabold"
        style={{
          fontSize: "45px",
        }}
      >
        Our Comprehensive Tools
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {items.map((item, index) => {
          return (
            <Link
              href={item.link}
              key={index}
              className="flex items-center flex-col"
            >
              <div className="rounded-full purple-box-shadow p-3 bg-white  w-fit">
                {item.icon}
              </div>
              <div className="font-semibold mt-3 w-[100px] text-center text-[16px]">
                {item.title}
              </div>
            </Link>
          );
        })}
        <Link href={"/tools"} className="flex items-center flex-col">
          <div className="rounded-full purple-box-shadow p-3 bg-white  w-fit">
            <ExternalLinkIcon
              className="text-primary "
              style={{
                width: "26px",
                height: "26px",
              }}
            />
          </div>
          <div className="font-semibold mt-3 w-[100px] text-center text-[16px]">
            See All Tools
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ComprehensiveTools;
