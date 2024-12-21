import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { CanvasContext } from "@/lib/contexts/canvas";
import { CustomImage } from "@/components/DesignTools/Canvas/customClasses/image";
import { nanoid } from "nanoid";

const AiImages = () => {
  const { canvas } = useContext(CanvasContext) || {};
  const [loading, setLoading] = useState(false);
  const [blobUrls, setBlobUrls] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchBlobUrls = async () => {
  //     const urls = await Promise.all(
  //       images.map(async (image: any) => {
  //         const response = await fetch(image.default.src);
  //         const blob = await response.blob();
  //         return URL.createObjectURL(blob);
  //       })
  //     );
  //     setBlobUrls(urls);
  //   };

  //   fetchBlobUrls();
  // }, []);

  // async function AddImageToTheCanvas(url: string) {
  //   console.log("url", url);
  //   setLoading(true);
  //   if (!canvas) return;
  //   try {
  //     const customImage = await CustomImage.FromURL(url, {
  //       uid: nanoid(),
  //       name: "Example Image",
  //       object_type: "image"
  //     });
  //     console.log(customImage);
  //     customImage.scale(0.5);
  //     canvas?.add(customImage);
  //     canvas?.renderAll();
  //   } catch (error) {
  //     console.error("Error loading image:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <div className="flex justify-center items-center max-h-[80vh] overflow-scroll flex-col">
      <h3>Titans Ai Image Generator</h3>
      <p className="mt-3 text-center">feature coming soon</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {/* {blobUrls.map((src: string, index: number) => (
          <div key={index} className="">
            <Image
              src={src}
              alt={`Image ${index}`}
              onClick={() => AddImageToTheCanvas(src)}
              className="object-cover"
              width={100}
              height={100}
            />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default AiImages;
