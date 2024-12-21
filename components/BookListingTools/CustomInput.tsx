import React from "react";
import { cn } from "@/lib/utils";

interface CustomInputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  severity?: "red" | "orange" | "gray";
  helperstyle?: React.CSSProperties;
  style?: React.CSSProperties;
  inputClassName?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  helperText,
  error,
  errorMessage,
  placeholder,
  severity = "gray",
  helperstyle = {},
  style = {},
  inputClassName = "",
  containerClassName = "",
  containerStyle = {},
  type = "text",
}) => {
  const borderColor = error ? (severity === "red" ? "red" : "orange") : "#ccc";
  const backgroundColor = error ? "#ffe6e6" : "white";
  const textColor = error ? (severity === "red" ? "red" : "orange") : "gray";

  return (
    <div
      className={cn(containerClassName)}
      style={{ position: "relative", ...containerStyle }}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          // paddingBottom: "30px", // Add extra padding to accommodate the helper text
          border: `1px solid ${borderColor}`,
          backgroundColor: backgroundColor,
          borderRadius: "30px",
          ...style,
          // boxSizing: "border-box",
        }}
        className={cn("rounded-full my-1", inputClassName)}
      />
      <div
        style={{
          position: "absolute",
          // bottom: "5px", // Adjust this value as needed
          right: "10px",
          top: "53px",
          fontWeight: "bold",
          fontSize: "9px",
          color: textColor,
          ...helperstyle,
        }}
      >
        {helperText}
      </div>
    </div>
  );
};

export default CustomInput;
