import React, { useEffect, useState, useRef, useCallback } from "react";
import { debounce } from "lodash";
import api from "@/api";
import { TApiRes } from "@/api/images";
import { TImage } from "@/lib/contexts/coverApp";
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

  const SearchImages = useCallback(
    debounce(async (query: string, page: number) => {
      setLoading(true);
      try {
        const result: TApiRes = await api.images.searchCoverImages(
          query,
          page,
          "book covers"
        );

        setHasMore(result.hasMore);
        setSearchResults((prevImages) => [
          ...prevImages,
          ...(result.images || []),
        ]);

        console.log("Search Results:", result);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

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
    setSearchResults([]);
    setPage(1);
    SearchImages(query, 1);
  }, [query, SearchImages]);

  useEffect(() => {
    if (hasMore && page > 1) {
      SearchImages(query, page);
    }
  }, [page, hasMore, query, SearchImages]);

  return (
    <div>
      <div className="max-h-[83vh] mt-10 grid grid-cols-2 gap-2 overflow-y-auto thin-scrollbar">
        {searchResults.length === 0 && !loading && (
          <div className="w-full flex justify-center">
            <p>No images found</p>
          </div>
        )}
        {searchResults.map((image: TImage, index: number) => {
          if (index === searchResults.length - 5) {
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

        {loading && (
          <div className="w-full flex justify-center">
            <div className="dot-loader-3"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
