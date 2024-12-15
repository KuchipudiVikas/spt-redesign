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
        {
          label: "Media",
          url: LinkIndex.MEDIA,
        },
      ],
    },
    {
      title: "Tools",
      links: [
        {
          label: "Research Tools",
          url: LinkIndex.RESEARCH_TOOLS,
        },
        {
          label: "Book Creation",
          url: LinkIndex.BOOK_CREATION,
        },
        {
          label: "Book Listing",
          url: LinkIndex.BOOK_LISTING,
        },
        {
          label: "Design Tools",
          url: LinkIndex.DESIGN_TOOLS,
        },
        {
          label: "General KDP",
          url: LinkIndex.GENERAL_KDP,
        },
        {
          label: "Training Tools",
          url: LinkIndex.TRAINING_TOOLS,
        },
        {
          label: "Contact Form",
          url: LinkIndex.CONTACT_FORM,
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          label: "About Us",
          url: LinkIndex.ABOUT,
        },
        {
          label: "Contact Us",
          url: LinkIndex.CONTACT_US,
        },
        {
          label: "Faqs",
          url: LinkIndex.FAQS,
        },
        {
          label: "Terms & Conditions",
          url: LinkIndex.TERMS_CONDITIONS,
        },
        {
          label: "Trademark",
          url: LinkIndex.TRADEMARK,
        },
        {
          label: "Features",
          url: LinkIndex.FEATURES,
        },
        {
          label: "Pricing",
          url: LinkIndex.PRICING,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#f7f7f8] pt-5 mt-20 pb-20">
      <div className="max-w-[1300px]  mx-auto font-jsans">
        <div className="grid grid-cols-5 mt-[20px] w-full">
          <div className="col-span-2">
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
              <div className="border  rounded-full mb-[40px] flex mt-2 p-1">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="w-full outline-none p-2 px-4 rounded-full"
                />
                <button className="bg-primary px-[38px] py-[19px] rounded-full text-white">
                  Subscribe
                </button>
              </div>
              <div className="">
                <h6 className="font-normal text-[18px]">
                  © Self Publising Titans. All Rights Reserved{" "}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-span-3 px-10 flex">
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
