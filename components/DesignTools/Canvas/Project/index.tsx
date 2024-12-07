import React, { useState, useEffect, useRef, useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { FaPen, FaPlus } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";
import CreatePopup from "./CreatePopup";
import ResizeSubmenu from "./submenu/resize";
import SaveIndex from "../../CoverCreator/TopOptionsBar/save";

const ProjectOptions = () => {
  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showResizeSubmenu, setShowResizeSubmenu] = useState(false);
  const Canvas = useContext(CanvasContext);
  const [newProjectName, setNewProjectName] = useState(
    Canvas.ProjectInfo.projectName
  );
  const [nameUpdateLoading, setNameUpdateLoading] = useState(false);

  // Update project name
  async function updateProjectName() {
    const body = {
      id: Canvas.projectID,
      name: newProjectName,
    };

    try {
      Canvas.setProjectInfo((prev) => ({
        ...prev,
        projectName: newProjectName,
      }));
      setNameUpdateLoading(true);
      setIsEditing(false);
      const res = await fetch(`/api/project/${Canvas.projectID}/rename`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        Canvas.setProjectInfo((prev) => ({
          ...prev,
          projectName: newProjectName,
        }));
      }
    } catch (error) {
      console.error("Error updating project name:", error);
    } finally {
      setNameUpdateLoading(false);
    }
  }

  const onClose = () => {
    setShowPopup(false);
    setIsEditing(false);
    setShowResizeSubmenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !(popupRef.current as HTMLElement).contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!Canvas) return null;

  function toggleDownload() {
    Canvas.setShowDownloadPopup(!Canvas.showDownloadPopup);
  }

  const toggleCreatePopup = () => {
    setShowPopup(false);
    Canvas.setShowCreatePopup(!Canvas.showCreatePopup);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateProjectName();
    }
  };

  return (
    <>
      <CreatePopup />
      <div className="color-picker-container">
        <div className="flex items-center justify-between  border-b border-gray-300">
          <h1
            onClick={() => setShowPopup(!showPopup)}
            className=" text-[14px]  cursor-pointer   "
          >
            File{" "}
          </h1>
        </div>
        {showPopup && (
          <div className="color-picker-popup mt-3 w-[300px] " ref={popupRef}>
            <div className="p-2">
              <div className="flex items-center justify-between">
                <h1 className="text-lg ">
                  {isEditing ? (
                    <div className="mt-2">
                      <input
                        onBlur={updateProjectName}
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter new project name"
                        style={{
                          border: "none",
                          borderBottom: "1px solid #000",
                        }}
                        className=" p-1 w-full text-lg "
                      />
                    </div>
                  ) : (
                    <span>
                      {Canvas.ProjectInfo.projectName || "Untitled Project"}
                    </span>
                  )}
                </h1>
                <button disabled={nameUpdateLoading}>
                  <FaPen onClick={() => setIsEditing(true)} />
                </button>
              </div>
            </div>
            <div className="p-2">
              <div
                className="cursor-pointer flex justify-between w-full items-center"
                onClick={() => toggleDownload()}
              >
                Download
                <ChevronRight />
              </div>
            </div>
            <div className="p-2">
              <div
                className="cursor-pointer flex justify-between w-full items-center"
                onClick={() => setShowResizeSubmenu(!showResizeSubmenu)}
              >
                Resize
                {showResizeSubmenu ? <ChevronLeft /> : <ChevronRight />}
              </div>
              {showResizeSubmenu && (
                <ResizeSubmenu onCancel={() => setShowResizeSubmenu(false)} />
              )}
            </div>
            <div className="p-2">
              <div
                className="cursor-pointer flex justify-between w-full items-center"
                onClick={() => toggleCreatePopup()}
              >
                Create New Cover
                <FaPlus />
              </div>
            </div>
            <SaveIndex />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectOptions;
