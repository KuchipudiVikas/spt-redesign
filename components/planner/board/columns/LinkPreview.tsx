import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type LinkData = {
  title: string;
  image: string;
  description: string;
};
function LinkPreview({ url }) {
  const [previewData, setPreviewData] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`
        );
        const data = await response.json();

        if (data.html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.html, "text/html");

          const title = doc.querySelector("title")?.textContent || "";
          const description =
            doc
              .querySelector('meta[name="description"]')
              ?.getAttribute("content") || "";
          const image =
            doc
              .querySelector('meta[property="og:image"]')
              ?.getAttribute("content") || "";

          console.log("Title:", title);
          console.log("Description:", description);
          console.log("Image:", image);
          const previewData: LinkData = {
            title,
            description,
            image,
          };
          setPreviewData(previewData);
          setLoading(false);
        } else {
          console.error("Failed to fetch preview:", data.error);
        }
      } catch (error) {
        console.error("Error fetching preview:", error);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!previewData) {
    return <p>Failed to fetch link preview.</p>;
  }

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="py-0" style={{ cursor: "pointer" }}>
      {previewData.image && (
        <Image
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
          src={previewData.image}
          alt="Link Preview"
          width={300}
          height={300}
          className="w-full h-fit"
        />
      )}
      <Link target="__blank" href={url}>
        <h6
          className={`line-clamp-2 mt-1 leading-5 text-[15.2px] pb-1 text-blue-500 ${
            showFullTitle ? "line-clamp-none" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setShowFullTitle(!showFullTitle);
          }}
        >
          {previewData.title}
        </h6>
      </Link>
      <h6
        className={`line-clamp-3 leading-6 text-sm ${
          showFullDescription ? "line-clamp-none" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setShowFullDescription(!showFullDescription);
        }}
      >
        {previewData.description}
      </h6>
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .line-clamp-none {
          -webkit-line-clamp: unset;
        }
      `}</style>
    </div>
  );
}

export default LinkPreview;
