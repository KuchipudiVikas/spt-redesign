import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/ts/types/blogpost";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  link: string;
  thumbnailUrl: string;
  title: string;
  post: BlogPost;
}

function BlogCard({ link, thumbnailUrl, title, post }: BlogCardProps) {
  return (
    <Link
      href={link}
      style={{ border: "1px solid #cccccc" }}
      className="w-full transform scale-95 sp-container hover:scale-100 transition-transform cursor-pointer min-h-[300px]  rounded-xl overflow-hidden"
    >
      {thumbnailUrl ? (
        <Image
          height={1200}
          width={1200}
          className="w-full h-56 bg-gray-400 object-cover"
          alt={title}
          src={thumbnailUrl}
        />
      ) : (
        <div className="w-full h-56 bg-gray-400"></div>
      )}
      <div className="p-4 pt-3">
        <div className="bg-white w-fit p-1 mb-2 font-bold rounded-full px-3">
          <span className="text-[12px] flex gap-1 w-fit items-center text-gray-500">
            <CalendarIcon className="w-3" />
            {format(post.createdAt, "MMMM dd, yyyy")}
          </span>
        </div>
        <h6 className="font-medium">{title}</h6>

        <Button
          variant={"ghost"}
          className="pl-0 font-bold text-primary flex items-end"
        >
          Read Blog <ArrowRight />
        </Button>
      </div>
    </Link>
  );
}

export default BlogCard;
