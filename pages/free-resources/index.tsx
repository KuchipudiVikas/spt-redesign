import MainLayout from "@/components/Layout";
import ProductCard from "@/components/Resources/ProductCard";
import { useEffect, useState } from "react";
import { TagFields } from "./resource/addresource";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import PageTitle from "@/components/Common/PageTitle";

export type Tag = {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  addedById: number;
};

type Resource = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  fileUrl: string;
  ProductTag: { tagId: number; tag: Tag }[];
};
export const dynamic = "force-dynamic";

const getResources = async (): Promise<Resource[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/resource/getresources`, {
      cache: "no-store",
      next: { revalidate: 10 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve resources: ${response.statusText}`);
    }
    const data = await response.json();
    return data.resources;
  } catch (error) {
    console.error("Error retrieving resources:", error);
    return [];
  }
};

// example response from /api/resource/getresources
// {
// "id": 11,
// "title": "test product with tag",
// "description": "test",
// "recommendedUse": "",
// "imageUrl": "https://pub-5da859198666414bbca8c7866fa6d266.r2.dev/showcase/dot.jpg",
// "fileUrl": "https://pub-5da859198666414bbca8c7866fa6d266.r2.dev/digitalproducts/BDRAILWAY_TICKET10013107144-1416716-4610-121542-1416471152140777.pdf",
// "addedById": 1,
// "createdAt": "2024-10-20T08:40:24.300Z",
// "updatedAt": "2024-10-20T08:40:24.300Z",
// "ProductTag": [
// {
// "productId": 11,
// "tagId": 1,
// "tag": {
// "id": 1,
// "name": "test update",
// "slug": "test_update",
// "description": "test",
// "createdAt": "2024-10-20T07:18:35.202Z",
// "updatedAt": "2024-10-20T07:43:46.496Z",
// "addedById": 1
// }
// }
// ]
// }

export default function Home({ info, resources, tags }) {
  const [filteredResources, setFilteredResources] =
    useState<Resource[]>(resources);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState(tags);

  useEffect(() => {
    const filteredResources = resources.filter((resource) => {
      if (selectedTags.length === 0) return true;
      return selectedTags.some((tag) =>
        resource.ProductTag.some((productTag) => productTag.tagId === tag)
      );
    });
    setFilteredResources(filteredResources);
  }, [selectedTags]);

  // if (!resources) {
  //   return (
  //     <MainLayout
  //       info={info}
  //       // transparentNav={true}
  //       meta={{
  //         title: "Free Resources",
  //         description: "Free resources",
  //         keywords: "free, resources, self-publishing",
  //       }}
  //       Title={
  //         <>
  //           <PageTitle title="Free Resources" />
  //         </>
  //       }
  //       Body={
  //         <div className="max-w-7xl m-auto">
  //           <main className="min-h-screen">
  //             <section className="products grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-items-center">
  //               <Typography
  //                 className="my-4"
  //                 fontWeight={600}
  //                 variant="h6"
  //                 letterSpacing={1}
  //               >
  //                 Loading...
  //               </Typography>
  //             </section>
  //           </main>
  //         </div>
  //       }
  //     />
  //   );
  // }

  return (
    <MainLayout
      meta={{
        title: "Free Resources",
        description: "Free resources",
        keywords: "free, resources, self-publishing",
      }}
      info={info}
      Title={<PageTitle title="Free Resources" />}
      Body={
        <div className="max-w-7xl mb-10  mx-auto mt-10">
          <main className="min-h-screen px-5">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-1 col-span-4">
                <TagFields
                  selectedTags={selectedTags}
                  allTags={tags}
                  setSelectedTags={setSelectedTags}
                  filteredTags={filteredTags}
                  setFilteredTags={setFilteredTags}
                />
              </div>
              <div className="products col-span-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5 justify-items-center">
                {filteredResources.map((product, index) => (
                  <ProductCard
                    key={index}
                    imgURL={product.imageUrl}
                    productTitle={product.title}
                    descriptionSynopsis={product.description}
                    downloadLink={product.fileUrl}
                    productId={product.id}
                    productTags={product.ProductTag.map(
                      (productTag) => productTag.tag
                    )}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      }
    />
  );
}

export async function getServerSideProps() {
  const allTagsResponse = await fetch(`${baseUrl}/api/resource/tags`);
  const allTags = await allTagsResponse.json();

  const resourcesResponse = await fetch(`${baseUrl}/api/resource/getresources`);
  const resources = await resourcesResponse.json();

  return {
    props: {
      tags: allTags,
      resources: resources.resources,
    },
  };
}
