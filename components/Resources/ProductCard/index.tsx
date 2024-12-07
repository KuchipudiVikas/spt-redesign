import Image from "next/image";
import ClientProductCard from "./client-product-card";
import { Tag } from "@/pages/free-resources";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudDownloadIcon } from "lucide-react";

export default function ProductCard({
  imgURL,
  productTitle,
  descriptionSynopsis,
  downloadLink,
  productId,
  productTags,
}: {
  imgURL: string;
  productTitle: string;
  descriptionSynopsis: string;
  downloadLink: string;
  productId: number;
  productTags: Tag[];
}) {
  return (
    <div className=" sp-container flex flex-col justify-between light-border p-2 border  max-w-80  rounded-lg overflow-hidden  text-gray-600">
      <div>
        <Image
          src={imgURL}
          alt={productTitle}
          width={400}
          height={300}
          className="w-full rounded-lg h-48 object-fill"
        />
        <ClientProductCard productId={productId} productTitle={productTitle} />
      </div>
      <h6 className="text-[14px] m-2 mt-0 font-light text-ellipsis line-clamp-4">
        {descriptionSynopsis}
      </h6>
      {/* <div className="flex justify-between flex-wrap m-2">
        {productTags.map((tag, index) => (
          <Link href={`/free-resources/tags/${tag.slug}`} key={index}>
            <h6 className="m-1 text-sm">{tag.name}</h6>
          </Link>
        ))}
      </div> */}
      <a href={downloadLink} className="m-2 mt-4 flex justify-end">
        <Button className="p-2 w-full  mb-3">
          Download
          <CloudDownloadIcon size={24} />
        </Button>
      </a>
    </div>
  );
}
