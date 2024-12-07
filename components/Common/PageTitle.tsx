import React from "react";
import BySptButton from "./BySptButton";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="title-container">
      <h1 className="title">{title}</h1>
      <BySptButton />
    </div>
  );
};

export default PageTitle;
