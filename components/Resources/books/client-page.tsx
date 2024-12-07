import Link from "next/link";
import { Category } from "@/pages/books/allcategories";
import { Button } from "@/components/ui/button";

export default function ClientTopBooks({
  Categories,
}: {
  Categories: Category[];
}) {
  return (
    <div>
      <div className="max-w-7xl m-auto flex items-center grid grid-cols-5 gap-4 mt-8">
        {Categories.map((category) => (
          <Link
            href={{
              pathname: "/books/category/" + category.link,
              query: { category: category.category },
            }}
            className="w-full"
            key={category.id}
          >
            {/* <li className="border m-2 border-gray-400 p-2 hover:text-violet-500 text-gray-700 hover:border-violet-500 transition-all duration-300">
              <h1>{category.category}</h1>
            </li> */}
            <Button
              variant={"outline"}
              style={{
                borderColor: "#6902cd",
              }}
              color="primary"
              className="rounded-full w-full"
            >
              {category.category}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
