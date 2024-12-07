import React from "react";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      {/* <Navbar /> */}
      <div className="main-container">{children}</div>
    </div>
  );
};

export default MainLayout;
