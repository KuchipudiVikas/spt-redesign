import { useState, useRef } from "react";

const ObjectName = ({ obj }: any) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    // @ts-ignore
    timeoutRef.current = setTimeout(() => {
      setPopoverVisible(true);
    }, 600);
  };

  const handleMouseLeave = () => {
    // @ts-ignore
    clearTimeout(timeoutRef.current);
    setPopoverVisible(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="w-[100px]">
        <span className="block w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {obj.name || obj.type}
        </span>
      </div>
      {isPopoverVisible && (
        <div className="popover">{obj.name || obj.type}</div>
      )}
    </div>
  );
};

export default ObjectName;
