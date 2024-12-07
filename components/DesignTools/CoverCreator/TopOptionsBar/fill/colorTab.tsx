import React, { useEffect, useState } from "react";

interface ColorTabProps {
  color: string;
  setColor: (color: string) => void;
  updateFill: (fill: string) => void;
}

const ColorTab = ({ color, setColor, updateFill }: ColorTabProps) => {
  const predefinedColors = [
    "#89CFF0", // Soft Blue
    "#FFD1DC", // Pale Pink
    "#98FF98", // Mint Green
    "#E6E6FA", // Lavender
    "#FFE5B4", // Peach
    "#87CEEB", // Sky Blue
    "#F08080", // Light Coral
    "#FFFF99", // Pale Yellow
    "#B19CD9", // Soft Purple
    "#20B2AA" // Light Sea Green
  ];

  const handleColorChange = (e: { target: { value: any } }) => {
    const newColor = e.target.value;
    setColor(newColor);
    updateFill(newColor);
  };

  const handleTransparent = (isTransparent: boolean) => {
    if (isTransparent) {
      setIsTransparent(true);
      setColor("transparent");
      updateFill("transparent");
    } else {
      setColor(predefinedColors[0]);
      updateFill(predefinedColors[0]);
      setIsTransparent(false);
    }
  };

  const [isTransparent, setIsTransparent] = useState(color === "transparent");

  // useEffect(() => {
  //   handleTransparent(isTransparent);
  // }, [isTransparent]);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="checkbox"
          name=""
          id=""
          checked={isTransparent}
          onChange={(e) => handleTransparent(e.target.checked)}
        />{" "}
        Transparent
      </div>
      <div className="flex gap-2">
        Custom Color:
        <input type="color" value={color} onChange={handleColorChange} />
      </div>
      <div className="grid grid-cols-5 mt-6 gap-y-3">
        {predefinedColors.map((predefinedColor) => (
          <div
            key={predefinedColor}
            className="color-button rounded-md relative"
            style={{
              background: predefinedColor,
              width: "40px",
              height: "40px",
              border:
                predefinedColor === "transparent" ? "1px solid #000" : "none"
            }}
            onClick={() => {
              setColor(predefinedColor);
              updateFill(predefinedColor);
            }}>
            {color === predefinedColor && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: predefinedColor === "transparent" ? "#000" : "#fff"
                }}>
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorTab;
