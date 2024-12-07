import React from "react";

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  severity?: "red" | "orange" | "gray";
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  helperText,
  error,
  errorMessage,
  placeholder,
  severity = "gray",
}) => {
  const borderColor = error ? (severity === "red" ? "red" : "orange") : "#ccc";
  const backgroundColor = error ? "#ffe6e6" : "white";
  const textColor = error ? (severity === "red" ? "red" : "orange") : "gray";

  console.log("Error messaeg is", errorMessage, helperText);

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
          border: `1px solid ${borderColor}`,
          backgroundColor: backgroundColor,
          borderRadius: "16px",
        }}
        className="rounded-full my-2"
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "10px",
          fontSize: "10px",
          color: textColor,
        }}
      >
        {helperText}
      </div>
    </div>
  );
};

export default CustomInput;
