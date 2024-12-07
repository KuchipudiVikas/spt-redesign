import { useState, useContext } from "react";
import React from "react";
import ImageWrapper from "@/components/DesignTools/Canvas/image";
import { TImage } from "@/lib/contexts/coverApp";
import { CanvasContext } from "@/lib/contexts/canvas";
import { CustomImage } from "@/components/DesignTools/Canvas/customClasses/image";
import { nanoid } from "nanoid";
import Alert from "@/components/DesignTools/Canvas/alert";
import NextImage from "next/image";

function getKeyFromUrl(url: string): string {
  const parsedUrl = new URL(url);
  const key = parsedUrl.pathname.substring(1);
  return key;
}

interface ImageContainerProps {
  image: TImage;
  hasPurchased: boolean;
}

const ImageContainer = ({ image, hasPurchased }: ImageContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { canvas } = useContext(CanvasContext) || { canvas: null };
  const [showAlert, setShowAlert] = useState(false);

  async function AddImageToTheCanvas(url: string, access: string, id: number) {
    setIsLoading(true);
    if (!canvas) {
      alert("Canvas not found");
      setIsLoading(false);
      return;
    }

    if (access == "paid" && !hasPurchased) {
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    // Find the background object
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");

    if (!background) {
      console.error("Background not found");
      alert("Background not found");
      setIsLoading(false);
      return;
    }

    try {
      const key = getKeyFromUrl(url);
      const imageUrl = "/api/image/" + key;

      const customImage = await CustomImage.FromURL(imageUrl, {
        uid: nanoid(),
        name: "Example Image",
        object_type: "image",
        ref_id: id,
      });

      const scaleX = background.width / customImage.width;
      const scaleY = background.height / customImage.height;
      let scale = Math.min(scaleX, scaleY);

      scale = scale - scale * 0.2;
      // scale = 1;

      customImage.scale(scale);

      const centerX =
        background.left + (background.width - customImage.width * scale) / 2;
      const centerY =
        background.top + (background.height - customImage.height * scale) / 2;
      customImage.set({
        left: centerX,
        top: centerY,
      });

      setIsLoading(false);
      canvas.add(customImage);
      canvas.renderAll();
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image");
      setIsLoading(false);
    }
  }
  return (
    <>
      {showAlert && (
        <Alert
          message="This is a pro image, please purchase the bundle to use it."
          onClose={() => setShowAlert(false)}
          type="error"
          url="/shop/66bcf76cbddfc3e1dc22a899"
        />
      )}
      <div
        onClick={() => AddImageToTheCanvas(image.link, image.access, image.id)}
      >
        <ImageWrapper access={image.access} isLoading={isLoading}>
          <NextImage
            src={image.preview || image.link}
            width={100}
            height={130}
            alt="image"
            loading="eager"
            // onLoad={() => setIsLoading(false)}
            className="rounded-md w-full h-full object-cover"
          />
        </ImageWrapper>
      </div>
    </>
  );
};

export default ImageContainer;
