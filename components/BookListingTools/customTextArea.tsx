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
  helperstyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  style?: React.CSSProperties;
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
  helperstyle = {},
  containerStyle = {},
  style,
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
        ...containerStyle,
      }}
    >
      <Textarea
        type="text"
        value={value}
        // @ts-ignore
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxShadow: "none",
          resize: "none",
          border: "none",
          ...style,
        }}
        className=" h-[96%] m"
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
          ...helperstyle,
        }}
      >
        {helperText}
      </div>
    </div>
  );
};

export default CustomTextArea;
