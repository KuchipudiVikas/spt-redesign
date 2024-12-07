import React, { useState, useContext, useEffect } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { SaveIcon } from "lucide-react";

const SaveIndex = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  const { canvas, projectID, ProjectInfo } = useContext(CanvasContext);
  const [previousState, setPreviousState] = useState("");

  useEffect(() => {
    const getCanvasState = () => {
      return JSON.stringify(canvas?.toJSON());
    };

    const checkForCanvasChanges = () => {
      const currentState = getCanvasState();
      if (currentState !== previousState) {
        UpdateProject(false);
        setPreviousState(currentState);
      }
    };

    setPreviousState(getCanvasState());

    const checkIntervalId = setInterval(checkForCanvasChanges, 60000);

    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        UpdateProject(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(checkIntervalId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas, previousState]);

  async function UpdateProject(isManual = true) {
    setSaveLoading(true);
    const data = canvas?.toJSON();
    if (!data) {
      setSaveLoading(false);
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
        page_width: ProjectInfo.page_width,
        page_height: ProjectInfo.page_height,
        cover_type: ProjectInfo.cover_type,
        page_count: ProjectInfo.page_count,
      }),
    });

    const result = await response.json();

    if (isManual) {
      if (response.status === 200) {
        alert("Project updated successfully");
      } else {
        alert("Failed to update project");
      }
    }

    setSaveLoading(false);
  }

  return (
    <div className="p-2 flex justify-between ">
      <button className="text-[16px]" onClick={() => UpdateProject(true)}>
        {saveLoading ? "Saving.." : "Save"}
        {/* <MdOutlineCloudUpload
          className={`text-green-500 ml-[8px] ${saveLoading ? "pulse-animation" : ""}`}
          size={20}
        /> */}
      </button>
      <SaveIcon
        style={{
          width: "16px",
        }}
      />
    </div>
  );
};

export default SaveIndex;
