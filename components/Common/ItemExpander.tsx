import { useState } from "react";
import { ArrowDown01Icon } from "lucide-react";
const contentStyle = {
  overflow: "hidden",
  transition: "all 0.3s",
};

const contentExpandedStyle = {
  ...contentStyle,
  padding: "4px 0",

  height: "auto",
  filter: "opacity(1)",
};

const contentCollapsedStyle = {
  ...contentStyle,
  padding: "0 0",
  border: "1px solid transparent",
  height: "0",
  filter: "opacity(0)",
};

const Expander = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const handleHeaderClick = () => {
    setExpanded((expanded) => !expanded);
  };
  return (
    <div className="flex flex-col justify-start">
      <div
        onClick={handleHeaderClick}
        className="flex items-center justify-between"
      >
        {title}
        <div className=" cursor-pointer transition-all">
          <ArrowDown01Icon
            className="transition-all"
            style={expanded ? { rotate: "180deg" } : {}}
          />
        </div>
      </div>
      <div style={expanded ? contentExpandedStyle : contentCollapsedStyle}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Expander;
