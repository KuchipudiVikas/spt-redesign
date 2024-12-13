import { TImage } from "@/lib/contexts/coverApp";
import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import api from "@/lib/api";
import Image from "next/image";
import { TApiRes } from "@/lib/api/images";
import ImageContainer from "../imageContainer";

interface SearchProps {
  query: string;
  hasPurchased: boolean;
}

const Search = ({ query, hasPurchased }: SearchProps) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const [searchResults, setSearchResults] = useState<TImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);

  async function SearchImages(query: string) {
    try {
      setLoading(true);
      const result: TApiRes = await api.images.searchCoverImages(
        query,
        page,
        "elements"
      );

      setHasMore(result.hasMore);
      setSearchResults((prevImages) => [
        ...prevImages,
        ...(result.images || []),
      ]);

      console.log("Search Results:", result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

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
    if (true) {
      setSearchResults([]);
      setPage(1);
      SearchImages(query);
    }
  }, [query]);

  useEffect(() => {
    if (hasMore && page > 1) {
      SearchImages(query);
    }
  }, [page]);

  return (
    <div>
      <div className="max-h-[70vh] mt-5 grid grid-cols-2 gap-2 overflow-y-auto thin-scrollbar">
        {loading && <div>Loading...</div>}
        {searchResults.map((image: TImage, index: number) => {
          if (index === searchResults.length - 1) {
            return (
              <div ref={lastImageElementRef} className="" key={index}>
                <ImageContainer image={image} hasPurchased={hasPurchased} />
              </div>
            );
          } else {
            return (
              <div className="" key={index}>
                <ImageContainer image={image} hasPurchased={hasPurchased} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Search;
