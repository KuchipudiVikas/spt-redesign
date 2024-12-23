import React from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/favIcon.png";
import LinkIndex from "@/lib/linkIndex";

const Footer = () => {
  type Links = {
    label: string;
    url: string;
  };

  type Item = {
    title: string;
    links: Links[];
  };

  const LinkData: Item[] = [
    {
      title: "Resources",
      links: [
        {
          label: "KDP Masterclass",
          url: LinkIndex.MASTERCLASS,
        },
        {
          label: "Affiliates",
          url: LinkIndex.AFFILIATEs,
        },
        {
          label: "Free Resources",
          url: LinkIndex.FREE_RESOURCES,
        },
        {
          label: "Support",
          url: LinkIndex.SUPPORT,
        },
        {
          label: "Blog",
          url: LinkIndex.BLOG,
        },
        {
          label: "Community",
          url: LinkIndex.COMMUNITY,
        },
      ],
    },
    {
      title: "Tools",
      links: [
        {
          label: "Research Tools",
          url: LinkIndex.TOOLS,
        },
        {
          label: "Book Creation",
          url: LinkIndex.TOOLS,
        },
        {
          label: "Book Listing",
          url: LinkIndex.TOOLS,
        },
        {
          label: "Design Tools",
          url: LinkIndex.TOOLS,
        },
        {
          label: "General KDP",
          url: LinkIndex.TOOLS,
        },
        {
          label: "Training Tools",
          url: LinkIndex.TOOLS,
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          label: "Terms & Conditions",
          url: LinkIndex.TERMS_CONDITIONS,
        },
        {
          label: "Privacy Policy",
          url: LinkIndex.PRIVACY_POLICY,
        },
        {
          label: "GDPR Policy",
          url: LinkIndex.GDPR_POLICY,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#f7f7f8] pt-5 px-5 mt-20 md:pb-20">
      <div className="max-w-[1300px]  mx-auto font-jsans">
        <div className="grid md:grid-cols-5 md:mt-[20px] w-full">
          <div className="col-span-2 md:block  flex items-center mb-10 md:mb-0 ">
            <img
              src={
                "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/favIcon.png"
              }
              alt="Brand Logo"
              width={85}
              height={85}
            />
            <div className="mt-[40px]">
              <h6 className="font-bold text-[18px]">
                Subscribe to Our Newsletter For Updates
              </h6>
              <div className="border rounded-full mb-[40px] w-fit flex mt-2 p-1">
                <div className=" bg-white rounded-full flex ">
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    className="w-full outline-none p-2 px-4 rounded-full"
                  />
                  <button className="bg-primary  px-[38px] py-[19px] rounded-full text-white">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="">
                <h6 className="font-normal text-[14px]">
                  © Self Publising Titans. All Rights Reserved{" "}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-span-3 px-10 w-full flex gap-5 md:gap-0">
            {LinkData.map((item, index) => (
              <div key={index} className="w-full">
                <h6 className="font-bold text-primary text-[18px]">
                  {item.title}
                </h6>
                <div className="mt-[44px]  flex flex-col">
                  {item.links.map((link, index) => (
                    <Link
                      href={link.url}
                      className="my-[10px] text-[14px]"
                      key={index}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
