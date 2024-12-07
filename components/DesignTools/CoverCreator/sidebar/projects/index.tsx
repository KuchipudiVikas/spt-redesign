import React, { useEffect, useState, useContext, useRef } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
// import LoadingBar from "@/components/Canvas/LoadingBarCustom";
// import CreateProject from "@/components/Canvas/Project/CreatePopup";
// import { TemplateType } from "@/lib/contexts/canvas";

interface ProjectsPanelProps {
  userID: string;
}

enum SortOption {
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  NAME = "name",
}

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

const ProjectsPanel = ({ userID }: ProjectsPanelProps) => {
  const Canvas = useContext(CanvasContext);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { canvas } = Canvas || { canvas: null };
  const [showAlert, setShowAlert] = useState(false);
  const { projects, setProjects } = Canvas || {};
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const fetchedPages = useRef<Set<number>>(new Set());
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.UPDATED_AT
  );

  useEffect(() => {
    const fetchProjects = async (page: number, append: boolean = false) => {
      if (fetchedPages.current.has(page)) {
        setLoading(false);
        return;
      }

      const encodedSortOrder = encodeURIComponent(sortOrder);
      const encodedSortOption = encodeURIComponent(sortOption);

      const template = router.pathname.includes("book-cover-creator")
        ? "book-cover"
        : "a+content";

      const encodedTemplateType = encodeURIComponent(template);

      try {
        setLoading(true);
        const response = await fetch(
          `/api/project?user_id=${userID}&template=${encodedTemplateType}&page=${page}&sortOrder=${encodedSortOrder}&sortOption=${encodedSortOption}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const result = await response.json();

        if (append) {
          setProjects((prevProjects) => {
            const newProjects = result.projects.filter(
              (newProject) =>
                !prevProjects.some((project) => project.id === newProject.id)
            );
            return [...prevProjects, ...newProjects];
          });
        } else {
          setProjects(result.projects);
        }

        setHasMore(result.hasMore);
        fetchedPages.current.add(page);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects(currentPage, true);
  }, [userID, currentPage, sortOrder, sortOption]);

  if (!canvas) return null;

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
    setProjects([]); // Clear current projects
    setCurrentPage(1); // Reset to first page when sort option changes
    fetchedPages.current.clear(); // Clear fetched pages
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as SortOrder);
    setCurrentPage(1); // Reset to first page when sort order changes
    setProjects([]); // Clear current projects
    fetchedPages.current.clear(); // Clear fetched pages
  };

  const sortedProjects = [...projects].sort((a, b) => {
    let comparison = 0;
    if (sortOption === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortOption === "created_at") {
      comparison =
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortOption === "updated_at") {
      comparison =
        new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const deleteProject = async (id: number) => {
    try {
      const response = await fetch(`/api/project/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const loadMoreProjects = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {/* <CreateProject
        showPopUp={showCreatePopup}
        setShowPopUp={setShowCreatePopup}
      /> */}

      <div className="options-pane">
        <h3 className="text-xl mb-2">Projects</h3>
        <hr />
        <div className="h-[50px]">
          <div className="text-input-w-icon mt-3">
            <FaSearch />
            <input
              type="text"
              className="text-input"
              placeholder="Search book covers"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex  mt-4 justify-between flex-col items-start">
          <div className="">
            <label htmlFor="sort" className="mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              className="font-space"
              onChange={handleSortChange}
            >
              <option value="created_at">Created At</option>
              <option value="updated_at">Updated At</option>
              <option value="name">Name</option>
            </select>
            <div className="">
              <label htmlFor="order" className=" mr-2">
                Order:
              </label>
              <select
                id="order"
                className="font-space"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className="mt-2 font-space"
          onClick={() => Canvas.setShowCreatePopup(true)}
        >
          Create A New Cover +{" "}
        </div>
        <div className="h-[83vh] grid grid-cols-2 gap-2  thin-scrollbar overflow-y-auto">
          {sortedProjects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onDelete={deleteProject}
            />
          ))}
        </div>
        {hasMore && !loading && (
          <div className="flex justify-center mt-4">
            <button
              className="text-blue-500 font-bold"
              onClick={loadMoreProjects}
              disabled={loading}
            >
              {loading ? "Loading..." : "Show More"}
            </button>
          </div>
        )}
        {loading && (
          <div className="w-full flex justify-center">
            {" "}
            <div className="dot-loader-3"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsPanel;

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

  const { canvas, projectID } = useContext(CanvasContext);

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

  const [saveLoading, setSaveLoading] = useState(false);

  async function UpdateProject() {
    setSaveLoading(true);
    const data = canvas?.toJSON();
    if (!data) {
      return;
    }

    const thumnbailUrl = canvas?.toDataURL();

    const response = await fetch("/api/project/" + projectID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: projectID,
        thumbnail_uri: thumnbailUrl,
        data: JSON.stringify(data),
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      alert("Project updated successfully");
      setSaveLoading(false);
      return result;
    } else {
      alert("Failed to update project");
      setSaveLoading(false);
    }

    setSaveLoading(false);
  }

  function handleProjectClick() {
    // save existing project
    UpdateProject().then(() => {
      router.push(`/book-cover-creator/${project.id}`);
    });
  }

  return (
    <>
      {/* <LoadingBar isLoading={saveLoading} title="Saving Current Project" /> */}
      <div
        key={project.id}
        className="border-2 p-2 flex justify-between hover:bg-gray-100 my-2 p-2 rounded-lg"
      >
        <div className="flex flex-col gap-4 cursor-pointer">
          <div
            onClick={() => {
              handleProjectClick();
            }}
            style={{ border: "1px solid #ccc" }}
            className="w-full flex justify-center items-center h-[120px]  rounded-lg"
          >
            {project.thumbnail_uri ? (
              <Image
                src={project.thumbnail_uri}
                width={100}
                height={100}
                alt="project thumbnail"
                style={{
                  objectFit: "cover",
                }}
                className="object-cover  "
              />
            ) : (
              <div className="w-[100px] rounded-lg h-full bg-white"></div>
            )}
          </div>
          <div className="flex ">
            <h1 className="text-[16px] font-bold">{project.name}</h1>
          </div>
          <div className="relative flex items-center">
            <div
              onClick={() => togglePopover(project.id)}
              className="cursor-pointer"
            >
              <BsThreeDotsVertical />
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
      </div>
    </>
  );
};
