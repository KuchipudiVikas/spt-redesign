import React from "react";

interface GradientTabProps {
  gradient: {
    type: string;
    color1: string;
    color2: string;
    center: number;
    angle: number;
  };
  setGradient: (gradient: {
    type: string;
    color1: string;
    color2: string;
    center: number;
    angle: number;
  }) => void;
  handleGradientChange: () => void;
}

const GradientTab = ({
  gradient,
  setGradient,
  handleGradientChange
}: GradientTabProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <select
          className="border rounded-xl p-2"
          value={gradient.type}
          onChange={(e) => setGradient({ ...gradient, type: e.target.value })}>
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
        <input
          type="color"
          value={gradient.color1}
          onChange={(e) => setGradient({ ...gradient, color1: e.target.value })}
        />
        <input
          type="color"
          value={gradient.color2}
          onChange={(e) => setGradient({ ...gradient, color2: e.target.value })}
        />
      </div>
      {gradient.type === "linear" && (
        <div className="flex items-center gap-2">
          <label>Angle:</label>
          <input
            type="number"
            min="0"
            className="border rounded-md p-1"
            max="360"
            value={gradient.angle}
            onChange={(e) =>
              setGradient({
                ...gradient,
                angle: parseFloat(e.target.value)
              })
            }
          />
        </div>
      )}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={gradient.center}
        onChange={(e) =>
          setGradient({ ...gradient, center: parseFloat(e.target.value) })
        }
      />
      <div
        className="gradient-preview"
        style={{
          background:
            gradient.type === "linear"
              ? `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${
                  gradient.color2
                } ${gradient.center * 100}%, ${gradient.color1})`
              : `radial-gradient(circle, ${gradient.color1}, ${
                  gradient.color2
                } ${gradient.center * 100}%, ${gradient.color1})`,
          width: "100%",
          height: "50px",
          borderRadius: "5px"
        }}></div>
      <button
        className="border px-2 rounded-md py-1"
        onClick={handleGradientChange}>
        Apply
      </button>
    </div>
  );
};

export default GradientTab;
