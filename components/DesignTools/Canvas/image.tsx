import React from "react";
import { FaCrown } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

interface CustomImageProps {
  children: React.ReactNode;
  access: string;
  isLoading: boolean;
}

const CustomImage = ({ children, access, isLoading }: CustomImageProps) => {
  return (
    <div className="custom-image-container w-[100px] h-[130px] cursor-pointer relative">
      {children}
      {access === "paid" && (
        <div className="pro-badge">
          <FaCrown size={13} />
          <span className="text-[10px]">Pro</span>
        </div>
      )}
      {isLoading && (
        <div className="loading-overlay mb-0.5 rounded-md">
          <ImSpinner9 className="spinner" size={24} />
        </div>
      )}
    </div>
  );
};

export default CustomImage;
