import React, { useState, useEffect } from "react";

interface ILoaderProps {
  loading: boolean;
  ButtonComp?: React.ReactNode;
  time?: number;
}

const Loader: React.FC<ILoaderProps> = ({
  loading,
  ButtonComp,
  time = 110,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 1 : 90));
      }, time);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [loading]);

  const loaderStyle = {
    width: "100%",
    height: "40px",
    borderRadius: "20px",
    color: "#7449fb",
    border: "2px solid currentColor",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const progressBarStyle = {
    position: "absolute",
    margin: "2px",
    top: 0,
    left: 0,
    right: `${100 - progress}%`,
    bottom: 0,
    borderRadius: "inherit",
    backgroundColor: "currentColor",
    transition: "right 0.1s linear",
    animation: "pulse 1.5s infinite",
  };

  const percentageTextStyle = {
    position: "absolute",
    color: "#ccc", // Text color
    fontWeight: "bold",
  };

  return (
    <div className="w-full">
      {loading ? (
        // @ts-ignore
        <div style={loaderStyle}>
          {/* Progress Bar */}
          {/* @ts-ignore */}
          <div style={progressBarStyle}></div>

          {/* @ts-ignore */}
          <span style={percentageTextStyle}>{progress}%</span>
        </div>
      ) : (
        ButtonComp
      )}
    </div>
  );
};

export default Loader;
