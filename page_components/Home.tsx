import React from "react";
import NewAuthorTools from "@/components/Home/AuthorTools";
import ChromeExtensions from "@/components/Home/ChromeExtensions";
import AllTools from "@/components/Home/AllTools";
import OurBook from "@/components/Home/OurBook";
import Reviews from "@/components/Home/Reviews";
import Image from "next/image";
import DotImage from "@/public/assets/home/dot-svgrepo-com.svg";
import Link from "next/link";
import { Testimonial } from "@/lib/ts/interfaces/testimonials";
import BottomBanner from "@/components/Common/BottomBanner";

import { User } from "@/lib/ts/types/user";
export interface HomeProps {
  info: User;
  token: string;
  pageData: {
    testimonials: Testimonial[];
  };
}

const Home: React.FC<HomeProps> = ({ pageData }) => {
  return (
    <div className="">
      <NewAuthorTools />
      <ChromeExtensions />
      <AllTools />
      <OurBook />
      <Reviews testimonials={pageData.testimonials} />
      <BottomBanner />
    </div>
  );
};

export default Home;
