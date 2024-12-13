import Image from "next/image";
import BrandLogo from "@/public/favIcon.png";
import { ArrowRight } from "lucide-react";

import Link from "next/link";
import { CheckIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface AuthorToolCardProps {
  Icon: React.ReactNode;
  Title: string;
  Items: string[];
  CtaLink: string;
}
const AuthorToolCard: React.FC<AuthorToolCardProps> = ({
  Icon,
  Title,
  Items,
  CtaLink,
}) => {
  return (
    <div
      style={{
        padding: "20px",
        background: "#f7f7f8",
        borderRadius: "25px",
        width: "377px",
      }}
      className=" h-full "
    >
      <div className="">
        {Icon}
        <h4
          style={{
            fontSize: "22px",
          }}
          className="font-extrabold "
        >
          {Title}
        </h4>
      </div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "15px",
        }}
        className=""
      >
        {Items.map((item, index) => (
          <li className="text-[16px] flex gap-2 items-center" key={index}>
            <CheckIcon
              style={{
                strokeWidth: "3px",
              }}
              className="text-primary font-bold"
              size={20}
            />
            {item}
          </li>
        ))}
      </ul>

      <Link
        style={{
          marginTop: "30px",
        }}
        className="flex hover:underline items-center gap-2 "
        href={CtaLink}
      >
        Learn more <ArrowRight size={20} />
      </Link>
    </div>
  );
};

function NewAuthorTools() {
  const ToolsData: AuthorToolCardProps[] = [
    {
      Icon: (
        <Image
          src={BrandLogo}
          alt="Brand Logo"
          width={72}
          className=""
          style={{
            width: "72px",
            height: "72px",
            objectFit: "contain",
          }}
          height={72}
        />
      ),
      Title: "Trademark Checking Tool",
      Items: ["Instant Trademark Check", "Stay Safe and Secure"],
      CtaLink: "/shop",
    },
    {
      Icon: (
        <Image
          src={BrandLogo}
          alt="Brand Logo"
          width={72}
          className=""
          style={{
            width: "72px",
            height: "72px",
            objectFit: "contain",
          }}
          height={72}
        />
      ),
      Title: "Guidelines Checking Tool",
      Items: ["Spot Issues You Might Miss", "Publish with Confidence"],
      CtaLink: "/shop",
    },
    {
      Icon: (
        <Image
          src={BrandLogo}
          alt="Brand Logo"
          width={72}
          className=""
          style={{
            width: "72px",
            height: "72px",
            objectFit: "contain",
          }}
          height={72}
        />
      ),
      Title: "Book Description Tool",
      Items: ["Get a Ready-to-Use Description", "Spot Trends and Patterns"],
      CtaLink: "/shop",
    },
    {
      Icon: (
        <Image
          src={BrandLogo}
          alt="Brand Logo"
          width={72}
          className=""
          style={{
            width: "72px",
            height: "72px",
            objectFit: "contain",
          }}
          height={72}
        />
      ),
      Title: "Book Listing Tool",
      Items: ["Get a Ready-to-Use Description", "Spot Trends and Patterns"],
      CtaLink: "/shop",
    },
    {
      Icon: (
        <Image
          src={BrandLogo}
          alt="Brand Logo"
          width={72}
          className=""
          style={{
            width: "72px",
            height: "72px",
            objectFit: "contain",
          }}
          height={72}
        />
      ),
      Title: "Title Generator Tool",
      Items: ["Get a Ready-to-Use Description", "Spot Trends and Patterns"],
      CtaLink: "/shop",
    },
    {
      Icon: (
        <Image
          src={BrandLogo}
          alt="Brand Logo"
          width={72}
          className=""
          style={{
            width: "72px",
            height: "72px",
            objectFit: "contain",
          }}
          height={72}
        />
      ),
      Title: "Book Data Translator",
      Items: ["Get a Ready-to-Use Description", "Spot Trends and Patterns"],
      CtaLink: "/shop",
    },
    {
      Icon: (
        <Image
          src={BrandLogo}
          alt="Brand Logo"
          width={72}
          className=""
          style={{
            width: "72px",
            height: "72px",
            objectFit: "contain",
          }}
          height={72}
        />
      ),
      Title: "Grammar Checking Tool",
      Items: ["Get a Ready-to-Use Description", "Spot Trends and Patterns"],
      CtaLink: "/shop",
    },
  ];

  return (
    <div
      style={{
        paddingTop: "50px",
      }}
      className="w-full  comp-container flex-col flex justify-between"
    >
      <div
        className="font-jsans mx-auto flex gap-3 font-extrabold"
        style={{
          fontSize: "45px",
        }}
      >
        New <span className="gradient-text">Author</span>
        Tools
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-3"
      >
        <CarouselContent>
          {ToolsData.map((tool, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <AuthorToolCard
                  Icon={tool.Icon}
                  Title={tool.Title}
                  Items={tool.Items}
                  CtaLink={tool.CtaLink}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default NewAuthorTools;
