import { BsTransparency } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";

const OpacitySlider = ({
  opacity,
  handleOpacityChange,
  selectedObject
}: {
  opacity: number;
  handleOpacityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedObject: any;
}) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    if (isPopoverVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverVisible]);

  return (
    <div className="relative">
      {selectedObject && (
        <div className="">
          <div className="flex flex-col">
            <label
              htmlFor="opacity"
              onClick={togglePopover}
              className="cursor-pointer px-2 p-1 flex gap-2 items-center rounded-lg text-14px"
              style={{ cursor: "pointer" }}>
              <BsTransparency />
            </label>
            {isPopoverVisible && (
              <div className="popover-custom" ref={popoverRef}>
                <input
                  type="range"
                  id="opacity"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={handleOpacityChange}
                />
                <div className="opacity-percentage">
                  {Math.round(opacity * 100)}%
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpacitySlider;
