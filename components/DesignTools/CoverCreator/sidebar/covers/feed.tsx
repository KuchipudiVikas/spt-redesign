import React, { useState, useEffect, useRef, useCallback } from "react";
import { TImage } from "@/lib/contexts/coverApp";
import ImageContainer from "../imageContainer";
import { useCoverApp } from "@/lib/contexts/coverApp";

interface CoverFeedProps {
  hasPurchased: boolean;
}

const CoverFeed = ({ hasPurchased }: CoverFeedProps) => {
  const { coverFeed, setCoverFeed } = useCoverApp();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(coverFeed.length / 40 + 1);

  console.log("page is", page);

  const observer = useRef<IntersectionObserver | null>(null);

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
    const fetchMoreImages = async () => {
      try {
        setLoading(true);
        const url = "/api/covers/feed?page=" + page;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        try {
          const data = await response.json();
          setCoverFeed((prevFeed) => [...prevFeed, ...data.images]);
        } catch (error) {}

        setLoading(false);
      } catch (error) {}
    };

    if (page > 0) {
      fetchMoreImages();
    }
  }, [page]);

  useEffect(() => {}, []);

  return (
    <div className="ml-4 grid grid-cols-2 thin-scrollbar p-2 gap-1">
      {coverFeed.map((image: TImage, index: number) => {
        if (index === coverFeed.length - 10) {
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
  );
};

export default CoverFeed;
