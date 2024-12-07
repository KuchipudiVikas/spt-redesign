import Image from "next/image";
import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import api from "@/api";
import { FaSearch } from "react-icons/fa";
import { nanoid } from "nanoid";
import { CustomImage } from "@/components/DesignTools/Canvas/customClasses/image";
import { ImageType } from "@/api/images";
import { useRouter } from "next/router";

export default function ExternalImagesTab() {
  const [query, setQuery] = useState("");

  type TExternalImage = {
    preview: string;
    ogImage: string;
    id: string;
  };

  const router = useRouter();
  const defaultQuery = router.pathname.includes("cover") ? "views" : "books";

  const [images, setImages] = useState<any[]>([]);
  const { canvas } = useContext(CanvasContext) || {};
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [imagesType, setImagesType] = useState<ImageType>("photo");

  async function fetchExternalImages(newPage: number) {
    setLoading(true);
    const res = await api.images.searchImages(
      query || defaultQuery,
      newPage,
      imagesType
    );
    // @ts-ignore
    setImages((prevImages) =>
      // @ts-ignore
      [...prevImages, ...(res || [])].filter((item) => typeof item !== "string")
    );
    setLoading(false);
  }

  const debouncedFetchImages = useCallback(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setImages([]);
      setPage(1);
      fetchExternalImages(1);
    }, 500); // 500ms debounce delay
  }, [query, imagesType]);

  useEffect(() => {
    debouncedFetchImages();
  }, [query, debouncedFetchImages]);

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    if (page > 1) {
      fetchExternalImages(page);
    }
  }, [page]);

  async function AddImageToTheCanvas(url: string) {
    setLoading(true);
    if (!canvas) return;

    // Find the background object
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");

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

  return (
    <div className="mt-2">
      <div className="text-input-w-icon ">
        <FaSearch />
        <input
          type="text"
          className="text-input"
          placeholder="search images"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <label htmlFor="">
          <span>Type:</span>
        </label>
        <select
          className="mt-2"
          onChange={(e) => setImagesType(e.target.value as ImageType)}
        >
          <option value="photo">All</option>
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
          <option value="vector">Vector</option>
        </select>
      </div>

      <div className="max-h-[83vh]  grid grid-cols-2 gap-2 overflow-y-auto thin-scrollbar">
        {images.map((image: TExternalImage, index: number) => {
          if (index === images.length - 1) {
            return (
              <div
                ref={lastImageElementRef}
                className=""
                key={index}
                onClick={() => AddImageToTheCanvas(image.ogImage)}
              >
                {image.preview.includes("static.vecteezy.com") ? (
                  <img
                    src={image.preview}
                    alt="image"
                    className="rounded-md w-full object-cover h-full"
                    width={400}
                    height={400}
                  />
                ) : (
                  <Image
                    src={image.preview}
                    alt="image"
                    loading="lazy"
                    className="rounded-md w-full object-cover h-full"
                    layout="responsive"
                    width={400}
                    height={400}
                    // sizes="(max-width: 600px) 100vw, 600px"
                  />
                )}
              </div>
            );
          } else {
            return (
              <div
                className=""
                key={index}
                onClick={() => AddImageToTheCanvas(image.ogImage)}
              >
                {image.preview.includes("static.vecteezy.com") ? (
                  <img
                    src={image.preview}
                    alt="image"
                    className="rounded-md w-full object-cover h-full"
                    width={400}
                    height={400}
                  />
                ) : (
                  <Image
                    src={image.preview}
                    alt="image"
                    loading="lazy"
                    className="rounded-md w-full object-cover h-full"
                    layout="responsive"
                    width={400}
                    height={400}
                    // sizes="(max-width: 600px) 100vw, 600px"
                  />
                )}

                {/* <Image
                  src={image.preview}
                  width={400}
                  height={400}
                  alt="image"
                  loading="lazy"
                  className="rounded-md w-full object-cover h-full"
                /> */}
              </div>
            );
          }
        })}
        {loading && (
          <div className="w-full flex justify-center">
            {" "}
            <div className="dot-loader-3"> </div>
          </div>
        )}
      </div>
    </div>
  );
}
