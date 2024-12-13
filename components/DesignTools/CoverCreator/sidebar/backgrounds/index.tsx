import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { CustomImage } from "@/components/Canvas/customClasses/image";
import Image from "next/image";
import { nanoid } from "nanoid";
import { TApiRes } from "@/lib/api/images";
import api from "@/lib/api";

const BackgroundsPanel = () => {
  const Canvas = useContext(CanvasContext);

  type TImage = {
    link: string;
    access: string;
    download: string;
  };

  const [images, setImages] = useState<TImage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { canvas } = Canvas || { canvas: null };

  async function fetchImages(category: string, page: number) {
    setLoading(true);
    try {
      const res: TApiRes = await api.images.searchCoverImages(
        category,
        page,
        "backgrounds"
      );

      setImages((prevImages) => [...prevImages, ...(res.images || [])]);
      setHasMore(res.hasMore);

      console.log("Images:", res);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages("gradient", page);
  }, [page]);

  async function AddImageToTheCanvas(url: string) {
    setLoading(true);
    if (!canvas) return;

    // Find the background object
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");

    console.log("Background:", background);

    if (!background) {
      console.error("Background not found");
      setLoading(false);
      return;
    }

    try {
      const customImage = await CustomImage.FromURL(url, {
        uid: nanoid(),
        name: "Example Image",
        object_type: "image",
      });

      const scaleX = background.width / customImage.width;
      const scaleY = background.height / customImage.height;
      let scale = Math.min(scaleX, scaleY);

      scale = scale - scale * 0.2;

      customImage.scale(scale);

      const centerX =
        background.left + (background.width - customImage.width * scale) / 2;
      const centerY =
        background.top + (background.height - customImage.height * scale) / 2;
      customImage.set({
        left: centerX,
        top: centerY,
      });

      canvas.add(customImage);
      canvas.renderAll();
    } catch (error) {
      console.error("Error loading image:", error);
    } finally {
      setLoading(false);
    }
  }

  const observer = useRef<IntersectionObserver | null>(null);

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="options-pane">
      <h3 className="text-xl mb-2"> Backgrounds</h3>
      <hr />
      <div className="max-h-[80vh] px-2 mt-5 grid grid-cols-2 gap-2 overflow-y-auto thin-scrollbar">
        {images.map((image: any, index: number) => {
          if (index === images.length - 1) {
            return (
              <div
                ref={lastImageElementRef}
                className="flex justify-center"
                key={index}
                onClick={() => AddImageToTheCanvas(image.link)}
              >
                <Image
                  src={image.preview || image.link}
                  width={100}
                  height={130}
                  alt="image"
                  loading="lazy"
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
            );
          } else {
            return (
              <div
                className="flex justify-center"
                key={index}
                onClick={() => AddImageToTheCanvas(image.link)}
              >
                <Image
                  src={image.preview || image.link}
                  width={100}
                  height={130}
                  alt="image"
                  loading="lazy"
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
            );
          }
        })}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default BackgroundsPanel;
