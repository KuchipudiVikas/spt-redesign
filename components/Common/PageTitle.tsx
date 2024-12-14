import React from "react";
import BySptButton from "./BySptButton";

interface PageTitleProps {
  title: string;
  showBySptButton?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  showBySptButton = true,
}) => {
  return (
    <div className="title-container">
      <h1 className="title">{title}</h1>
      {showBySptButton && <BySptButton />}
    </div>
  );
};

export default PageTitle;
