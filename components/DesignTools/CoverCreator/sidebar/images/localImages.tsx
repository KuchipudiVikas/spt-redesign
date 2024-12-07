import React, { useState, useContext, useRef, useEffect } from "react";
import * as fabric from "fabric";
import { CanvasContext } from "@/lib/contexts/canvas";
import Image from "next/image";
import { FaUpload } from "react-icons/fa6";

const LocalImages = () => {
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
    setLoading(true);
    try {
      const img = await fabric.Image.fromURL(url, { crossOrigin: "anonymous" });
      img.scale(0.5);
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
    <div className="mt-3">
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
        className="flex bg-blue-500 text-white gap-2 items-center border p-2 px-4 rounded-xl"
      >
        <FaUpload />
        Upload Image
      </button>

      {loading && <div>Loading...</div>}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`preview-${index}`}
            width={100}
            className="object-cover"
            height={100}
            style={{
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={() => AddImageToTheCanvas(url)}
          />
        ))}
      </div>
    </div>
  );
};

export default LocalImages;
