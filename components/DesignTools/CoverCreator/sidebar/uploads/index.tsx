import React from "react";
import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { FaUpload } from "react-icons/fa6";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";

const UploadsPanel = () => {
  const Canvas = useContext(CanvasContext);
  const fillColor = "#E6E6FA";

  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { canvas } = useContext(CanvasContext) || {};

  const dbName = "ImageDB";
  const storeName = "images";

  useEffect(() => {
    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      getImagesFromDB(db);
    };

    openRequest.onerror = (event) => {
      console.error("IndexedDB error:", event);
    };
  }, []);

  const addImageToDB = (image: string) => {
    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      store.add({ image });

      transaction.oncomplete = () => {
        console.log("Image added to IndexedDB");
      };

      transaction.onerror = (event) => {
        console.error("Error adding image to IndexedDB:", event);
      };
    };
  };

  const getImagesFromDB = (db: IDBDatabase) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      const images = request.result.map(
        (item: { image: string }) => item.image
      );
      setImageUrls(images);
    };

    request.onerror = (event) => {
      console.error("Error retrieving images from IndexedDB:", event);
    };
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataUrl = e.target?.result as string;
        setImageUrls((prevUrls) => [...prevUrls, dataUrl]);
        addImageToDB(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  async function AddImageToTheCanvas(url: string) {
    const background = canvas
      ?.getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");

    console.log("Background:", background);

    if (!background) {
      console.error("Background not found");
      return;
    }

    setLoading(true);
    try {
      const img = await fabric.Image.fromURL(url, { crossOrigin: "anonymous" });

      // Calculate the scale to fit the image inside the background
      const scaleX = background.width / img.width;
      const scaleY = background.height / img.height;
      let scale = Math.min(scaleX, scaleY);
      scale = scale - scale * 0.2;
      img.scale(scale);

      // Calculate the position to center the image within the background
      const centerX =
        background.left + (background.width - img.width * scale) / 2;
      const centerY =
        background.top + (background.height - img.height * scale) / 2;
      img.set({
        left: centerX,
        top: centerY,
      });

      canvas?.add(img);
      canvas?.renderAll();
    } catch (error) {
      console.error("Error loading image:", error);
    } finally {
      setLoading(false);
    }
  }

  const InputRef = useRef<HTMLInputElement>(null);

  return (
    <div className=" options-pane">
      <h3 className="text-xl mb-2"> Uploads</h3>
      <hr className="my-3 mb-5" />
      <input
        ref={InputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e)}
      />

      <button
        onClick={() => {
          InputRef.current!.click();
        }}
        className="flex bg-blue-500 text-white gap-2 items-center border p-2 px-4 w-fit rounded-xl"
      >
        <FaUpload />
        Upload Image
      </button>
      <div className="overflow-y-auto mt-2 thin-scrollbar">
        {loading && <div>Loading...</div>}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {imageUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`preview-${index}`}
              width={130}
              className="object-cover rounded-lg"
              height={130}
              style={{
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => AddImageToTheCanvas(url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadsPanel;
