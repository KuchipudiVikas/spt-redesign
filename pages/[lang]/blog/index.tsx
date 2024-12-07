import Link from "next/link";
// import MainTemplate, { getProfile } from "@/components/MainPage/MainPage";import imageFB from "@/public/assets/blogs/fb_group.jpeg";
import imageYT from "@/public/assets/blogs/yt_channel.jpeg";
import imageCO from "@/public/assets/blogs/kdp_course.jpeg";
import Image from "next/image";
import BlogCard from "@/components/Resources/Blog/BlogCard";
import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "@/lib/strapi/fetch-api";
import LoadingBar from "@/components/utils/LoadingBar";
import MainLayout, { getProfile } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/Common/PageTitle";
import { GetServerSidePropsContext } from "next";
import { BlogPost } from "@/lib/ts/types/blogpost";
import imageFB from "@/public/assets/blogs/fb_group.jpeg";

const staticBlogs = [
  {
    title: "KDP Facebook Groups",
    thumbnail: imageFB.src,
    link: "/fb-groups",
  },
  {
    title: "KDP Youtube Channels",
    thumbnail: imageYT.src,
    link: "/youtube-channels",
  },
  {
    title: "KDP Courses",
    thumbnail: imageCO.src,
    link: "/courses",
  },
];

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

function BlogIndex({ info, lang }) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/blog-lists`;
      const urlParamsObject = {
        locale: lang,
        sort: { createdAt: "desc" },
        populate: {
          Thumbnail: { fields: ["url"] },
          // category: { populate: "*" },
          // authorsBio: {
          //   populate: "*",
          // },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      console.log("responseData", responseData);
      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  console.log("data", data);

  return (
    <MainLayout
      // head={{
      //   title: "Blogs - Self Publishing Titans",
      // }}
      meta={{
        title: "Blogs - Self Publishing Titans",
        description: "Our latest blogs on self publishing",
        keywords: "self publishing, blogs, self publishing blogs",
      }}
      // transparentNav={true}
      Title={<PageTitle title="Our Latest Blogs" />}
      Body={
        <div className="min-h-96">
          <LoadingBar isLoading={isLoading} title="Loading..." />
          <div className=" mt-8 max-w-screen-xl container mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-left">
              {data?.map((content, index) => (
                <BlogCard
                  key={index}
                  title={content.title}
                  link={`/en/blog/${content.slug}`}
                  thumbnailUrl={content?.Thumbnail?.url || ""}
                  post={content as BlogPost}
                />
              ))}
            </div>
          </div>

          {/* {"pagination":{"start":0,"limit":6,"total":2}} */}

          {meta?.pagination.start + meta?.pagination.limit <
            meta?.pagination.total && (
            <div className="flex justify-center my-8">
              <Button
                variant="contained"
                color="primary"
                onClick={loadMorePosts}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      }
      info={info}
    />
  );
}

export default BlogIndex;

// using next auth
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { lang } = context.query;

  if (!lang) {
    lang = "en";
  }

  const info = await getProfile(context, {
    lang: lang,
  });

  return info;
}
