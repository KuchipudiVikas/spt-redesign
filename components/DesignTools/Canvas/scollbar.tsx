import React, { useRef, useEffect, useState, useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";

interface CustomScrollbarProps {
  contentWidth?: number;
  viewportWidth?: number;
  ScrollX?: number;
}

function CustomScrollbar({
  contentWidth = 500,
  viewportWidth = 900,
  ScrollX,
}: CustomScrollbarProps) {
  const scrollbarRef = useRef(null);
  const thumbRef = useRef(null);
  const [thumbWidth, setThumbWidth] = useState(100);
  const Canvas = useContext(CanvasContext);
  const { canvas } = Canvas || {
    canvas: null,
  };

  useEffect(() => {
    const scrollbar = scrollbarRef.current;
    const thumb = thumbRef.current;

    // Calculate the thumb width based on the viewport and content width
    const calculatedThumbWidth = contentWidth - viewportWidth;
    setThumbWidth(calculatedThumbWidth);

    let isDragging = false;
    let startX;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - thumb.offsetLeft;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX - startX;
      console.log("X", x);
      const maxScrollLeft = scrollbar.offsetWidth - thumb.offsetWidth;
      const newLeft = Math.min(Math.max(x, 0), maxScrollLeft);
      thumb.style.left = `${newLeft}px`;

      // Calculate the scroll position as a percentage
      const scrollPercentage = newLeft / maxScrollLeft;

      console.log(scrollPercentage);

      // Apply the scroll percentage to the canvas viewport transformation
      const newViewportTransform = [...canvas.viewportTransform];
      console.log(newViewportTransform);
      newViewportTransform[4] =
        -scrollPercentage * (contentWidth - viewportWidth);
      // @ts-ignore
      canvas.setViewportTransform(newViewportTransform);
      canvas.requestRenderAll();
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    thumb.addEventListener("mousedown", onMouseDown);

    return () => {
      thumb.removeEventListener("mousedown", onMouseDown);
    };
  }, [contentWidth, viewportWidth]);

  return (
    <div className="scrollbar" ref={scrollbarRef}>
      <div
        className="scrollbar-thumb"
        ref={thumbRef}
        style={{
          width: thumbWidth,
          position: "absolute",
          transform: "translateX(0)",
        }}
      ></div>
    </div>
  );
}

export default CustomScrollbar;
