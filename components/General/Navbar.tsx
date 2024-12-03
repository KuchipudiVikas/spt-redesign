import React from "react";
import Image from "next/image";
import BrandLogo from "@/public/favIcon.png";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import DotIcon from "@/public/assets/home/dot-svgrepo-com.svg";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      style={{
        borderBottom: "2px solid #ccc",
      }}
      className="fixed top-0 left-0 w-full px-24 py-3 flex  items-center justify-between bg-transparent z-50"
    >
      <Link href={"/"}>
        <Image src={BrandLogo} alt="Brand Logo" width={50} height={50} />
      </Link>

      <div className="flex gap-4 ">
        <span>Tools</span>
        <span>Resources</span>
        <Link href={"/pricing"}>Pricing</Link>
        <span>Testimonials</span>
      </div>
      <div className="flex gap-1">
        <Link href={"/login"}>
          <Button className="font-bold" variant={"ghost"}>
            Login <ArrowRightIcon size={20} className="font-bold" />
          </Button>
        </Link>
        <Button
          className="font-bold flex rounded-full"
          style={{
            padding: "16px 25px",
          }}
        >
          <Image src={DotIcon} alt="Brand Logo" width={5} height={5} />
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
