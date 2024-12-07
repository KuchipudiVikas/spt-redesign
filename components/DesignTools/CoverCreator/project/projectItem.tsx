import { useRouter } from "next/router";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";

export type Project = {
  name: string;
  id: number;
  data: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  thumbnail_uri: string;
  template: string;
};

interface ProjectItemProps {
  project: Project;
  onDelete: (id: number) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onDelete }) => {
  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = (id: number) => {
    setActivePopoverId(activePopoverId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setActivePopoverId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      key={project.id}
      className="border-2 w-[550px] flex justify-between hover:bg-gray-100 my-2 p-2 rounded-lg"
    >
      <div
        onClick={() => {
          router.push(`/book-cover-creator/${project.id}`);
        }}
        className="flex gap-4 cursor-pointer"
      >
        <div
          style={{ border: "1px solid #ccc" }}
          className="w-[160px] flex justify-center items-center h-[120px]  rounded-lg"
        >
          {project.thumbnail_uri ? (
            <Image
              src={project.thumbnail_uri}
              width={130}
              height={130}
              alt="project thumbnail"
              style={{
                objectFit: "cover",
              }}
              className="object-cover "
            />
          ) : (
            <div className="w-full rounded-lg h-full bg-white"></div>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{project.name}</h1>
          <p className="text-sm">
            Updated :{" "}
            {format(new Date(project.updated_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        </div>
      </div>
      <div className="relative flex items-center">
        <div
          onClick={() => togglePopover(project.id)}
          className="cursor-pointer"
        >
          <EllipsisVertical />
        </div>
        {activePopoverId === project.id && (
          <div
            ref={popoverRef}
            className="absolute bottom-[60%] w-[150px] mt-2 right-0 bg-white border border-gray-300 shadow-lg p-2 rounded"
          >
            <button
              onClick={() => handleDelete(project.id)}
              className="bg-red-500 font-bold text-white px-4 py-2 w-full rounded"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
