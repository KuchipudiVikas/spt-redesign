import {
  HOME_VIDEOS_BASE_URL,
  HOME_VIDEOS_POSTERS_PATH,
  HOME_VIDEOS_BASE_URL_ORIGIN,
} from "@/data/constants";
import React, { useEffect, useRef } from "react";

function VideoComponent({ imgSrc }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          videoRef.current.src = HOME_VIDEOS_BASE_URL + imgSrc + ".webm";
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [imgSrc]);

  return (
    <div className="flex justify-center lg:justify-end items-center col-span-3">
      <div className="flex items-center justify-center ">
        <div
          className="flex items-center justify-center w-full h-auto rounded-xl overflow-hidden"
          style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            className="shadowAround w-full"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            poster={HOME_VIDEOS_POSTERS_PATH + imgSrc + ".webp"}
            onError={(e) => {
              (e.target as HTMLVideoElement).src =
                HOME_VIDEOS_BASE_URL_ORIGIN + imgSrc + ".webm";
            }}
          >
            <source
              src={HOME_VIDEOS_BASE_URL + imgSrc + ".webm"}
              type="video/webm"
            />
          </video>
        </div>
      </div>
    </div>
  );
}

export default VideoComponent;
