import React, { useState, useCallback, useEffect, useRef } from "react";
import ToolSearchData, { SectionItem } from "./searchData";
import { getRequest } from "@/api/interface";
import Link from "next/link";
import { ApiResponse } from "@/lib/models/interfaces/community";
import BlogPost from "@/lib/models/interfaces/blog";
import { blogs as Blogs } from "@/data/blogs";
import { Input } from "@/components/ui/input";
import {
  BookTextIcon,
  CircleHelp,
  NewspaperIcon,
  SearchIcon,
} from "lucide-react";

// Custom debounce function
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const Index: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState({
    tools: false,
    community: false,
  });

  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const [toolResults, setToolResults] = useState<SectionItem[]>([]);
  const [communityResults, setCommunityResults] = useState<ApiResponse[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filterData = (query: string) => {
    if (query === "") return setToolResults([]);

    const filteredResults = ToolSearchData.filter((item: SectionItem) =>
      item.item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setToolResults(filteredResults);
  };

  let abortController: AbortController | null = null;

  const simulateApiRequest = async (query: string) => {
    if (query === "") return;
    setCommunityResults([]);
    const params = {
      q: query,
      page: 1,
      order: "relevance",
      size: 5,
    };

    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    const { data, error } = await getRequest<any>(
      `https://community.selfpublishingtitans.com/answer/api/v1/search?q=${params.q}&page=${params.page}&order=${params.order}&size=${params.size}`,
      {
        retries: 3,
        timeout: 15000,
        signal,
      }
    );
    if (error) {
      console.error(error);
      return [];
    }
    const CData = data.data.list as ApiResponse[];
    const results = CData;
    return results;
  };

  const fetchCommunityResults = async (query: string) => {
    setSearchLoading((prev) => ({ ...prev, community: true }));
    const results = await simulateApiRequest(query);
    setCommunityResults(results || []);
    setSearchLoading((prev) => ({ ...prev, community: false }));
  };

  const debouncedFetchCommunityResults = useCallback(
    debounce(fetchCommunityResults, 300),
    []
  );

  const filterBlogData = (query: string) => {
    const filteredResults = Blogs.filter((item: BlogPost) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setBlogs(filteredResults);
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    const query = event.target.value;
    setQuery(query);
    setShowDropdown(true);
    debouncedFilterData(query);
    debouncedFetchCommunityResults(query);
    filterBlogData(query);
  };

  const debouncedFilterData = useCallback(debounce(filterData, 0), []);

  function getCommunityLink(item: ApiResponse) {
    const baseUrl = "https://community.selfpublishingtitans.com/questions/";
    if (item.object_type == "question") {
      return baseUrl + item.object.id;
    }
    return baseUrl + item.object.question_id + "/" + item.object.id;
  }

  const handleClickOutside = (event: { target: Node | null }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative w-full sm:w-[250px] md:w-[250px] lg:w-[350px] font-sans"
      ref={dropdownRef}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "20px",
          background: "white",
          outline: "none",
        }}
        className="relative flex items-center px-3 py-0.5"
      >
        <SearchIcon
          className="  w-4 transform  text-gray-400"
          style={{ fontSize: 20 }}
        />
        <Input
          style={{
            border: "none",
            borderRadius: "13px",
            outline: "none",
          }}
          type="text"
          className="border no-focus-ring outline-none ring-0 rounded-md px-3 w-full"
          placeholder="Search"
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          autoComplete="off"
        />
      </div>
      {showDropdown && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white text-black border border-gray-300 w-[350px] rounded-md shadow-lg z-10">
          <div className="p-2">
            {searchLoading.tools && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              </div>
            )}
            {!searchLoading.tools && (
              <div className="flex items-center pt-2 px-2">
                <div className="font-bold text-[16px] flex gap-2 items-center">
                  <BookTextIcon
                    style={{
                      fontSize: 18,
                    }}
                  />
                  Tools
                </div>
              </div>
            )}
            <div className="px-2 mt-2">
              <hr
                className=""
                style={{
                  borderTop: "1px solid #e2e8f0",
                  borderBottom: "1px solid #edf2f7",
                  borderLeft: "none",
                }}
              />
            </div>
            <div className="">
              {toolResults.map((item, index) => (
                <Link href={item.productLink} target="__blank" key={index}>
                  <div className="p-2 border-b border-gray-300 hover:bg-gray-200 rounded-lg cursor-pointer">
                    <div className="text-gray-800 font-semibold">
                      {item.item}
                    </div>
                    <div className="text-gray-500 truncate-text-1">
                      {item.tag}
                    </div>
                  </div>
                </Link>
              ))}
              {toolResults.length === 0 && query && (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          </div>
          <div className="p-2 ">
            <div className="flex items-center px-2">
              <div className="font-bold text-[16px] flex gap-2 items-center">
                <CircleHelp
                  style={{
                    fontSize: 18,
                  }}
                />
                Community
              </div>
            </div>

            <div className="px-2 mt-2">
              <hr
                className=""
                style={{
                  borderTop: "1px solid #e2e8f0",
                  borderBottom: "1px solid #edf2f7",
                  borderLeft: "none",
                }}
              />
            </div>
            <div className="">
              {communityResults.map((item, index) => (
                <Link
                  href={getCommunityLink(item)}
                  target="__blank"
                  key={index}
                >
                  <div className="p-2 border-b border-gray-300 hover:bg-gray-200 rounded-lg cursor-pointer">
                    <div className="text-gray-800 font-semibold truncate-text-2">
                      {item.object_type == "question"
                        ? item.object.title
                        : item.object.excerpt}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <div className="text-gray-500 font-medium">
                        Answers: {item.object.vote_count}
                      </div>
                      <div className="text-gray-500 font-medium">
                        Votes: {item.object.answer_count}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {communityResults.length === 0 &&
                query &&
                !searchLoading.community && (
                  <div className="p-2 text-gray-500">No results found</div>
                )}
              {searchLoading.community && <div className="p-2">loading...</div>}
            </div>
          </div>
          <div className="p-2">
            {
              <div className="flex items-center px-2">
                <div className="font-bold text-[16px] flex gap-2 items-center">
                  <NewspaperIcon
                    style={{
                      fontSize: 18,
                    }}
                  />{" "}
                  Blog
                </div>
              </div>
            }
            <div className="px-2 mt-2">
              <hr
                className=""
                style={{
                  borderTop: "1px solid #e2e8f0",
                  borderBottom: "1px solid #edf2f7",
                  borderLeft: "none",
                }}
              />
            </div>
            <div className="">
              {blogs.map((item, index) => (
                <Link href={item.link} target="__blank" key={index}>
                  <div className="p-2 border-b border-gray-300 hover:bg-gray-200 rounded-lg cursor-pointer">
                    <div className="text-gray-800 font-semibold">
                      {item.title}
                    </div>
                    {/* <div className="text-gray-500">{item.tag}</div> */}
                  </div>
                </Link>
              ))}
              {blogs.length === 0 && query && (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
