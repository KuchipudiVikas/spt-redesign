import { ChevronDown } from "lucide-react";
import React from "react";

interface CustomSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  helperText?: string;
  style?: React.CSSProperties;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  error,
  helperText,
  style = {},
}) => {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={onChange}
        className={`py-2.5 px-4 m-0 border w-full rounded-md ${
          error ? "border-red-500 bg-red-100" : "border-gray-300"
        }`}
        style={{
          appearance: "none",
          marginTop: "8px",
          backgroundColor: error ? "#ffe6e6" : "white",
          paddingRight: "30px", // Add space for the custom arrow
          ...style,
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Custom Arrow Icon */}
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "55%",
          transform: "translateY(-50%)",
          pointerEvents: "none", // Prevent interference with clicks
          color: error ? "red" : "gray",
        }}
      >
        <ChevronDown />
      </div>
      <div
        style={{
          textAlign: "right",
          width: "100%",
          margin: 0,
          fontSize: "10px",
          paddingRight: "10px",
          color: error ? "red" : "gray",
        }}
      >
        {helperText}
      </div>
    </div>
  );
};

export default CustomSelect;
