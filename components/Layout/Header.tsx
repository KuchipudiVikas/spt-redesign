import React from "react";
import Navbar from "../General/Navbar";
import BGsvg from "@/public/assets/home/bg.svg";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const headerStyle = {
    backgroundImage: `url(${BGsvg.src})`, // Ensure the correct path to the SVG
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",

    borderBottom: "1.5px solid #ccc",
  };

  return (
    <div style={headerStyle}>
      <Navbar />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default Header;
