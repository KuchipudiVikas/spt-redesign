import React, { useState, useEffect, useRef, useCallback } from "react";
import { useCoverApp } from "@/lib/contexts/coverApp";
// import CoverFeed from "../coverFeed";
import ImageContainer from "../imageContainer";
import { TImage } from "@/lib/contexts/coverApp";

export type TypesImages = {
  category: string;
  images: TImage[];
  hasMore: boolean;
};

interface CategoriesProps {
  hasPurchased: boolean;
}

const capitalize = (text: string) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const Categories = ({ hasPurchased }: CategoriesProps) => {
  // const {
  //   coverImageCategories,
  //   setCoverImageCategories,
  //   coverFeed,
  //   setCoverFeed
  // } = useCoverApp();

  const [coverImageCategories, setCoverImageCategories] = useState<
    TypesImages[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {}, []);

  async function fetchImages(category: string, page: number) {
    setLoading(true);

    const url = "/api/covers/admin/images";
    const requestBody = {
      type: "book covers",
      category: category,
      page: page,
    };

    try {
      console.log("url", url);

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

      console.log("data is", data);

      if (!data.images || !Array.isArray(data.images)) {
        throw new Error("Invalid response format");
      }

      const results: TImage[] = [];
      data.images.forEach((image: TImage) => {
        results.push(image);
      });

      setCoverImageCategories((prevCategories) =>
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
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    if (coverImageCategories.length > 0) return;

    setLoading(true);
    const url = "/api/covers/categories/admin";
    const requestBody = {
      type: "book covers",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    console.log("categories data is", data);

    const results = [];

    try {
      data.images.forEach((category: any) => {
        results.push({
          category: category.category,
          images: [],
          hasMore: true,
        });
      });

      setCoverImageCategories(results);
      setLoading(false);
    } catch (error) {}
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
        const cat = coverImageCategories.find(
          (cat) => cat.category === category
        );
        if (cat && cat.images.length === 0) {
          fetchImages(category, 1);
        }
      }
      return newSet;
    });
  };

  const categoryOrder = [
    "general",
    "patterns",
    "cute",
    "kids",
    "adults",
    "light color",
    "antique",
  ];

  const sortedCategories = coverImageCategories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.category.toLowerCase());
    const indexB = categoryOrder.indexOf(b.category.toLowerCase());

    if (indexA === -1 && indexB === -1) {
      return a.category.localeCompare(b.category);
    } else if (indexA === -1) {
      return 1;
    } else if (indexB === -1) {
      return -1;
    } else {
      return indexA - indexB;
    }
  });

  const [hasMasterExpanded, setHasMasterExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-1 thin-scrollbar mt-4 pt-4 overflow-y-auto">
      {loading && <p>Loading...</p>}
      <button
        style={{
          backgroundColor: "",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
        className=" w-full p-2 mt-1 text-[16px] font-space flex gap-3  py-3 text-left"
        onClick={() => setHasMasterExpanded(!hasMasterExpanded)}
      >
        {hasMasterExpanded ? "▼" : "▶"}{" "}
        <span className="ml-1">{"Cover Designs"}</span>
      </button>
      {hasMasterExpanded && (
        <div className="ml-3">
          {sortedCategories.map((cat) => (
            <Category
              key={cat.category}
              cat={cat}
              expandedFolders={expandedFolders}
              handleFolderClick={handleFolderClick}
              fetchImages={fetchImages}
              loading={loading}
              hasPurchased={hasPurchased}
            />
          ))}
        </div>
      )}
      {/* <CoverFeed hasPurchased={hasPurchased} /> */}
    </div>
  );
};

export default Categories;

interface CategoryProps {
  cat: TypesImages;
  expandedFolders: Set<string>;
  handleFolderClick: (category: string) => void;
  fetchImages: (category: string, page: number) => void;
  loading: boolean;
  hasPurchased: boolean;
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

  // useEffect(() => {
  //   if (page > 1) {
  //     fetchImages(cat.category, page);
  //   }
  // }, [page]);

  return (
    <div>
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
          <span className="ml-1">{capitalize(cat.category)}</span>
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
          </div>
        )}
      </div>
    </div>
  );
};
