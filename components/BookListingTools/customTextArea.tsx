import React from "react";
import { Textarea } from "../ui/textarea";

interface CustomTextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  severity?: "red" | "orange" | "gray";
  rows: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  value,
  onChange,
  helperText,
  error,
  errorMessage,
  placeholder,
  severity = "gray",
  rows = 4,
}) => {
  const borderColor = error ? (severity === "red" ? "red" : "orange") : "#ccc";
  const backgroundColor = error ? "#ffe6e6" : "white";
  const textColor = error ? (severity === "red" ? "red" : "orange") : "gray";

  return (
    <div
      className="w-full my-2"
      style={{
        position: "relative",
        padding: "10px",
        border: `1px solid ${borderColor}`,
        borderRadius: "20px",
        backgroundColor: backgroundColor,
      }}
    >
      <Textarea
        type="text"
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxShadow: "none",
          resize: "none",
          border: "none",
        }}
        className="rounded-full m"
      />
      <div
        style={{
          // position: "absolute",
          // bottom: "-20px",
          right: "10px",
          fontSize: "10px",
          color: textColor,
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "10px",
        }}
      >
        {helperText}
      </div>
    </div>
  );
};

export default CustomTextArea;
