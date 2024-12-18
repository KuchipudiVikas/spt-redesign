import React from "react";
import { CheckIcon } from "lucide-react";

interface CheckOutlinedProps {
  containerClassName?: string;
  iconClassName?: string;
}

const CheckOutlined: React.FC<CheckOutlinedProps> = ({
  containerClassName = "",
  iconClassName = "",
}) => {
  return (
    <div
      className={`bg-green-500  text-white rounded-full p-1 ${containerClassName}`}
    >
      <CheckIcon className={`w-4 h-4 ${iconClassName}`} />
    </div>
  );
};

export default CheckOutlined;

type CheckIconTextProps = CheckOutlinedProps & {
  text: string;
  textClassName?: string;
  textStyles?: React.CSSProperties;
};

export const CheckIconText: React.FC<CheckIconTextProps> = ({
  text,
  textClassName,
  textStyles,
  containerClassName,
  iconClassName,
}) => {
  return (
    <div className="flex my-3 items-center">
      <CheckOutlined
        iconClassName={iconClassName}
        containerClassName={containerClassName}
      />
      <span
        style={{
          ...textStyles,
        }}
        className={`ml-2 ${textClassName}`}
      >
        {text}
      </span>
    </div>
  );
};
