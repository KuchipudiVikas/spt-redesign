import React from "react";

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  severity?: "red" | "orange" | "gray";
  helperstyle?: React.CSSProperties;
  style?: React.CSSProperties;
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
}) => {
  const borderColor = error ? (severity === "red" ? "red" : "orange") : "#ccc";
  const backgroundColor = error ? "#ffe6e6" : "white";
  const textColor = error ? (severity === "red" ? "red" : "orange") : "gray";

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
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
        className="rounded-full my-1"
      />
      <div
        style={{
          position: "absolute",
          // bottom: "5px", // Adjust this value as needed
          right: "10px",
          top: "53px",
          fontSize: "10px",
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
