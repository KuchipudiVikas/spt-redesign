import Link from "next/link";

export default function ClientProductCard({
  productId,
  productTitle,
}: {
  productId: number;
  productTitle: string;
}) {
  return (
    <Link href={`/free-resources/resource/single/${productId}`}>
      <h6 className="overflow-ellipsis line-clamp-2 cursor-pointer text-[18px] p-2 font-bold bg-clip-text bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 mt-2">
        {productTitle}
      </h6>
    </Link>
  );
}
