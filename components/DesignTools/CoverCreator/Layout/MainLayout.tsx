import React from "react";

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
