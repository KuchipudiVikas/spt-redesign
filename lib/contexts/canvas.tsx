import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import * as fabric from "fabric";

export type TemplateType = "a+content" | "book-cover";

export type ProjectInfo = {
  projectID: string;
  projectName: string;
  cover_type?: string;
  page_width?: number;
  page_height?: number;
  page_count?: number;
  template: TemplateType;
};

export type CanvasContextType = {
  canvas: fabric.Canvas | null;
  setCanvas: Dispatch<SetStateAction<any>>;
  pages: any;
  setPages: Dispatch<SetStateAction<any>>;
  selectedPage: any | null;
  setSelectedPage?: Dispatch<SetStateAction<any | null>>;
  isSnappingOn: boolean;
  setIsSnappingOn: Dispatch<SetStateAction<boolean>>;
  projectID: string;
  setProjectID: Dispatch<SetStateAction<string>>;
  projects: any;
  setProjects: Dispatch<SetStateAction<any>>;
  showDownloadPopup: boolean;
  setShowDownloadPopup: Dispatch<SetStateAction<boolean>>;
  ProjectInfo: ProjectInfo;
  setProjectInfo: Dispatch<SetStateAction<ProjectInfo>>;
  showCreatePopup: boolean;
  setShowCreatePopup: Dispatch<SetStateAction<boolean>>;
  userID: string;
  setUserID: Dispatch<SetStateAction<string>>;
  zoomLevel: number;
  setZoomLevel: Dispatch<SetStateAction<number>>;
  showGuideLines: boolean;
  setShowGuideLines: Dispatch<SetStateAction<boolean>>;
  RecenterCanvas: () => void;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

interface CanvasProviderProps {
  children: ReactNode;
}

function CanvasProvider({ children }: CanvasProviderProps) {
  const [canvas, setCanvas] = useState<any>(null);
  const [pages, setPages] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState<any | null>(null);
  const [isSnappingOn, setIsSnappingOn] = useState<boolean>(true);
  const [projectID, setProjectID] = useState<string>("");
  const [projects, setProjects] = useState<any>([]);
  const [ProjectInfo, setProjectInfo] = useState<ProjectInfo>({
    projectID: "",
    projectName: "",
    template: "book-cover",
  });
  const [showDownloadPopup, setShowDownloadPopup] = useState<boolean>(false);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState(0.5);
  const [showGuideLines, setShowGuideLines] = useState(false);

  function RecenterCanvas() {
    if (canvas) {
      const centerX = canvas.getWidth() / 2;
      const centerY = canvas.getHeight() / 2;

      const zoomLevel = 0.4;

      const clippingPath = canvas.clipPath;

      if (clippingPath) {
        const clipCenterX = clippingPath.left + clippingPath.width / 2;
        const clipCenterY = clippingPath.top - 60 + clippingPath.height / 2;

        canvas.setViewportTransform([
          zoomLevel,
          0,
          0,
          zoomLevel,
          centerX - clipCenterX * zoomLevel,
          centerY - clipCenterY * zoomLevel,
        ]);
      } else {
        canvas.setViewportTransform([
          zoomLevel,
          0,
          0,
          zoomLevel,
          centerX - centerX * zoomLevel,
          centerY - centerY * zoomLevel,
        ]);
      }

      canvas.renderAll();
    }
  }

  return (
    <CanvasContext.Provider
      value={{
        canvas,
        setCanvas,
        pages,
        setPages,
        selectedPage,
        setSelectedPage,
        isSnappingOn,
        setIsSnappingOn,
        projectID,
        setProjectID,
        projects,
        setProjects,
        showDownloadPopup,
        setShowDownloadPopup,
        ProjectInfo,
        setProjectInfo,
        showCreatePopup,
        setShowCreatePopup,
        userID,
        setUserID,
        zoomLevel,
        setZoomLevel,
        setShowGuideLines,
        showGuideLines,
        RecenterCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export default CanvasProvider;
