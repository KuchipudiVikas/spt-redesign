import ImageContainer from "../imageContainer";
import React from "react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import CustomImage from "@/components/Canvas/image";
import { useCoverApp, TImage, TypesImages } from "@/lib/contexts/coverApp";

interface CategoriesProps {
  hasPurchased: boolean;
}

export const Categories = ({ hasPurchased }: CategoriesProps) => {
  const { elementsCategories, setElementsCategories } = useCoverApp();
  const [loading, setLoading] = useState<boolean>(false);

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  async function fetchImages(category: string, page: number) {
    setLoading(true);

    try {
      const url = "/api/covers/images";
      const requestBody = {
        type: "elements",
        category: category,
        page: page,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const results: TImage[] = [];
      data.images.forEach((image: TImage) => {
        results.push(image);
      });

      setElementsCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.category === category
            ? {
                ...cat,
                images: [...cat.images, ...results],
                hasMore: data.hasMore,
              }
            : cat
        )
      );
    } catch (error) {
      console.error("Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  }
  async function fetchCategories() {
    if (elementsCategories.length > 0) {
      return;
    }

    setLoading(true);
    const url = "/api/covers/categories";
    const requestBody = {
      type: "elements",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    const results = [];
    data.images.forEach((category: any) => {
      results.push({ category: category.category, images: [], hasMore: true });
    });

    setElementsCategories(results);
    setLoading(false);

    // results.forEach((cat) => {
    //   fetchImages(cat.category, 1);
    // });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFolderClick = (category: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
        const cat = elementsCategories.find((cat) => cat.category === category);
        if (cat && cat.images.length === 0) {
          fetchImages(category, 1);
        }
      }
      return newSet;
    });
  };

  const desiredOrder = ["general", "name tags", "people"];

  const sortedCategories = elementsCategories.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.category.toLowerCase());
    const indexB = desiredOrder.indexOf(b.category.toLowerCase());

    if (indexA === -1 && indexB === -1) {
      return 0;
    } else if (indexA === -1) {
      return 1;
    } else if (indexB === -1) {
      return -1;
    } else {
      return indexA - indexB;
    }
  });

  return (
    <div className="flex flex-col gap-1 thin-scrollbar mt-4 overflow-y-auto">
      {" "}
      {loading && <p>Loading...</p>}
      {sortedCategories.map((cat) => (
        <Category
          key={cat.category}
          cat={cat}
          loading={loading}
          expandedFolders={expandedFolders}
          handleFolderClick={handleFolderClick}
          fetchImages={fetchImages}
          hasPurchased={hasPurchased}
        />
      ))}
    </div>
  );
};

export default Categories;

interface CategoryProps {
  cat: TypesImages;
  expandedFolders: Set<string>;
  handleFolderClick: (category: string) => void;
  fetchImages: (category: string, page: number) => void;
  hasPurchased: boolean;
  loading: boolean;
}

export const Category = ({
  cat,
  expandedFolders,
  handleFolderClick,
  fetchImages,
  loading,
  hasPurchased,
}: CategoryProps) => {
  const [page, setPage] = useState(2);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !cat.hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, cat.hasMore]
  );

  useEffect(() => {
    if (page > 1) {
      fetchImages(cat.category, page);
    }
  }, [page]);

  return (
    <div>
      {" "}
      <div key={cat.category}>
        <button
          style={{
            backgroundColor: "",

            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
          className=" w-full p-2 mt-1 text-[16px] font-space flex gap-3  py-3 text-left"
          onClick={() => handleFolderClick(cat.category)}
        >
          {expandedFolders.has(cat.category) ? "▼" : "▶"}{" "}
          <span className="ml-1">{cat.category}</span>
        </button>
        {expandedFolders.has(cat.category) && (
          <div className="ml-4 grid grid-cols-2 thin-scrollbar p-2 gap-1 ">
            {cat.images.map((image: TImage, index: number) => {
              if (index === cat.images.length - 5) {
                return (
                  <div
                    ref={lastImageElementRef}
                    className="flex justify-center"
                    key={index}
                  >
                    <ImageContainer image={image} hasPurchased={hasPurchased} />
                  </div>
                );
              } else {
                return (
                  <div className="flex justify-center" key={index}>
                    <ImageContainer image={image} hasPurchased={hasPurchased} />
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
        )}
      </div>
    </div>
  );
};
