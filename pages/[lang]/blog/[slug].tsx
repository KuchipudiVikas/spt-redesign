import Link from "next/link";
// import ComInputMultiLine from "@/components/Inputs/InputMultiline";
// import ComInput from "@/components/Inputs/Input";
// import ComButton from "@/components/Button1";
import type { GetServerSidePropsContext, Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchAPI } from "@/lib/strapi/fetch-api";
import BlogCard from "@/components//Resources/Blog/BlogCard";
import MainLayout, { getProfile } from "@/components/Layout";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquareIcon, ArrowLeft, Calendar } from "lucide-react";

async function getPostBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/blog-lists`;
  const urlParamsObject = {
    locale: lang,
    filters: { slug },
    // populate: {
    //   // Thumbnail: { fields: ["url"] },
    //   // authorsBio: { populate: "*" },
    //   // category: { fields: ["name"] },
    //   blocks: {
    //     populate: {
    //       __component: "*",
    //       files: "*",
    //       file: "*",
    //       url: "*",
    //       body: "*",
    //       title: "*",
    //       // author: "*",
    //     },
    //   },
    // },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

// get last 3 blogs

async function getMetaData(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/blog-lists`;
  const urlParamsObject = {
    locale: lang,
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string };
}): Promise<Metadata> {
  const meta = await getMetaData(params.slug, params.lang);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

const BlogPost = ({ info, data, lBs, lang }) => {
  if (!data) {
    return null;
  }
  return (
    <MainLayout
      info={info}
      // head={{
      //   title: "Blogs - Self Publishing Titans",
      // }}
      meta={{
        title: "Blogs - Self Publishing Titans",
        description: "Our latest blogs on self publishing",
        keywords: "self publishing, blogs, self publishing blogs",
      }}
      Title={<></>}
      Body={
        <div>
          <div className="min-h-screen  mx-auto p-0 mt-10 pt-12 ">
            <div className="max-w-screen-xl mx-auto border-l border-r px-0 md:px-8">
              <div className="flex justify-between items-center">
                <Button variant={"ghost"}>
                  <ArrowLeft />
                  <Link href="/blog">To Blogs</Link>
                </Button>
                <div className="flex w-full justify-end font-light gap-4 ">
                  <div className="flex flex-row">
                    <div className="w-[2rem]">
                      <Calendar className="w-4" />
                    </div>
                    <h6 className="text-sm">
                      {new Date(data.createdAt).toDateString()}
                    </h6>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-[2rem]">
                      <MessageSquareIcon className="w-4" />
                    </div>
                    <h6 className="text-sm">0 Comments</h6>
                  </div>
                </div>
              </div>
              <h6 className=" text-gray-700 font-extrabold text-[28px] px-4  my-4 py-4">
                {data.title}
              </h6>

              <div
                className="prose font-sans blog-section min-h-[50vh] w-full max-w-[100vw] break-words px-4 mx-auto"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />

              {/* <BlockRendererClient
                content={data.content}

              /> */}

              <div className="my-8">
                <h6 className="mb-4 font-bold">YOU MIGHT ALSO LIKE</h6>

                <div className="grid grid-cols-3 gap-5 ">
                  {lBs.map((content, index) => (
                    <BlogCard
                      key={index}
                      title={content.title}
                      thumbnailUrl={
                        content?.Thumbnail?.url || content.thumbnail
                      }
                      post={content}
                      link={`/blog/${content.slug}`}
                    />
                  ))}
                </div>
              </div>

              {/* <div className="hidden my-8">
                <h3 className="mb-4">LEAVE A REPLY</h3>

                <div className="">
                  <div className="flex ">
                    <Input label="Name" />
                    <Input label="Email" />
                  </div>
                  <Textarea label="Message" />
                  <Button text="Post Comment" />
                </div>

                <div className="my-4">
                  <div className="p-4 border-l-2">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p>John Smith</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default BlogPost;

// using next auth
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug, lang } = context.query;

  const data = await getPostBySlug(slug, lang || "en");

  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/blog-lists`;
  const urlParamsObject = {
    locale: lang || "en",
    sort: { createdAt: "desc" },
    populate: {
      Thumbnail: { fields: ["url"] },
      // category: { populate: "*" },
      // authorsBio: {
      //   populate: "*",
      // },
    },
    pagination: {
      start: 0,
      limit: 3,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const responseData = await fetchAPI(path, urlParamsObject, options);

  return getProfile(context, {
    data: data.data[0],
    lBs: responseData.data,
    lang: lang || "en",
  });
}
