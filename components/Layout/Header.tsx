import React from "react";
import Navbar from "../General/Navbar/index";
import BGsvg from "@/public/assets/home/bg.svg";
import { User } from "@/lib/ts/types/user";
// const Navbar = dynamic(() => import("spt-core"), {
//   ssr: false, // Optionally disable server-side rendering for this component
// });

// import { Navbar } from "spt-react";

interface HeaderProps {
  children: React.ReactNode;
  info: User | undefined;
  token: string;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ children, info, token, logout }) => {
  const headerStyle = {
    backgroundImage: `url(${BGsvg.src})`, // Ensure the correct path to the SVG
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",

    borderBottom: "1.5px solid #ccc",
  };

  return (
    <div style={headerStyle}>
      <Navbar info={info} token={token} logout={logout} />
      <div className="pt-[60px]">{children}</div>
    </div>
  );
};

export default Header;
