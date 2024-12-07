import React, { useEffect, useState } from "react";
import type { Project } from "./projectItem";
import ProjectItem from "./projectItem";
import { TemplateType } from "@/lib/contexts/canvas";
import { useRef } from "react";

interface IDashboardProps {
  userID: string;
  templateType?: TemplateType;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
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

function ProjectsComponent({
  userID,
  templateType = "book-cover",
  projects,
  setProjects,
}: IDashboardProps) {
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.UPDATED_AT
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const fetchedPages = useRef<Set<number>>(new Set());

  useEffect(() => {
    const fetchProjects = async (page: number, append: boolean = false) => {
      if (fetchedPages.current.has(page)) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const encodedTemplateType = encodeURIComponent(templateType);
        const encodedSortOrder = encodeURIComponent(sortOrder);
        const encodedSortOption = encodeURIComponent(sortOption);

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
              (newProject: any) =>
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
    <div className=" ">
      <h1 className="text-xl font-semibold mb-2">Projects</h1>
      <hr className="my-3" />
      <div className="flex my-2 justify-between w-[550px] items-center">
        <div className="">
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            className=""
            onChange={handleSortChange}
          >
            <option value="created_at">Created At</option>
            <option value="updated_at">Updated At</option>
            <option value="name">Name</option>
          </select>
          <label htmlFor="order" className="ml-4 mr-2">
            Order:
          </label>
          <select
            id="order"
            className=""
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {loading && <p>Loading projects...</p>}

      <div className="h-[60vh] thin-scrollbar overflow-y-auto">
        {sortedProjects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onDelete={deleteProject}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button onClick={loadMoreProjects} disabled={loading}>
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectsComponent;
