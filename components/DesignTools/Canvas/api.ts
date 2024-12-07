import { Dispatch, SetStateAction } from "react";

interface ProjectInfo {
  project_id: string;
  userID: string;
  setProjectLoading: Dispatch<SetStateAction<boolean>>;
}

export const fetchProject = async ({
  project_id,
  userID,
  setProjectLoading
}: ProjectInfo) => {
  try {
    setProjectLoading(true);

    if (!project_id) {
      throw new Error("Project ID is missing");
    }

    const response = await fetch(`/api/project/${project_id}?userID=${userID}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch project: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error or fetch-related error:", error);
    } else {
      console.error("Error fetching project:", error);
    }
    return null;
  } finally {
    setProjectLoading(false);
  }
};
