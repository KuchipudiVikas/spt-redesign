import { useState } from "react";
import React from "react";
import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import TextPanel from "./text";
import ShapesPanel from "./shapes";
import { EPanels } from "@/lib/models/panels";
import ImagesPanel from "./images";
import TemplatesPanel from "./templates";
import CoverImages from "./covers/coverImages";
import UploadsPanel from "./uploads";
import TextSideBar from "./text/sidebar";
import BackgroundsPanel from "./backgrounds";
import { useRouter } from "next/router";
import { CoverAppProvider } from "@/lib/contexts/coverApp";
import ProjectsPanel from "./projects";
import { motion } from "framer-motion";
import AdminPanel from "./admin/adminPanel";
import {
  ChevronDown,
  CircleChevronRight,
  CircleChevronRightIcon,
} from "lucide-react";
import { CircleChevronLeft } from "lucide-react";

interface SidebarMainProps {
  isOwner: boolean;
  userID: string;
}

const adminID = "6323247cdc63d3001ba872e8";

const SidebarMain = ({ isOwner, userID }: SidebarMainProps) => {
  const canvas = useContext(CanvasContext);
  const [currentPanel, setCurrentPanel] = useState<EPanels>(EPanels.BookCovers);

  if (!canvas) return null;

  function HandleSelect(panel: EPanels) {
    setCurrentPanel(panel);
  }

  return (
    <div className="options-pane-main flex">
      <PanelOptions
        userId={userID}
        onSelect={HandleSelect}
        selecedPanel={currentPanel}
      />
      <CoverAppProvider>
        <PanelDisplay
          panel={currentPanel}
          onSelect={HandleSelect}
          isOwner={isOwner}
          userID={userID}
        />
      </CoverAppProvider>
    </div>
  );
};

export default SidebarMain;

interface PanelOptionsProps {
  onSelect: (panel: EPanels) => void;
  selecedPanel: EPanels;
  userId: string;
}
const PanelOptions = ({
  onSelect,
  selecedPanel,
  userId,
}: PanelOptionsProps) => {
  return (
    <div className="panel-options font-space">
      <span className=" text-black text-center text-[12px] font-medium mb-1 pb-3 ">
        Beta - v 0.37
      </span>
      <div className="flex items-center flex-col justify-center">
        <button
          onClick={() => onSelect(EPanels.BookCovers)}
          className={`panel-option ${
            selecedPanel === EPanels.BookCovers ? "active" : ""
          }`}
        >
          {selecedPanel === EPanels.BookCovers ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000000"
            >
              <path d="M560-555.15v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9.5t-67 26.5Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9.5t-67 26.5Zm-40 176q44-21 88.5-31.5t91.5-10.5q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394ZM480.72-142.3q-48.24-37.76-104.24-59.72-56-21.96-116.48-21.96-41.18 0-80.9 11.12-39.71 11.12-76.23 30.64-24.35 12.68-47.32-1.15-22.96-13.84-22.96-40.35v-481.76q0-14.35 6.81-27.02 6.82-12.68 20.45-19.02 47.24-23 97.13-35.02 49.9-12.03 102.32-12.03 58.46 0 114.2 15T480-737.85q51-30.48 106.62-45.6 55.62-15.12 114.08-15.12 52.42 0 102.32 12.03 49.89 12.02 97.13 35.02 13.63 6.34 20.45 19.02 6.81 12.67 6.81 27.02v485.35q0 25.63-22.84 38.23-22.85 12.6-47.44-.32-36.52-19.52-76.23-30.64-39.72-11.12-80.9-11.12-60 0-115.64 22.08-55.64 22.07-103.64 59.6Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000000"
            >
              <path d="M560-555.15v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9.5t-67 26.5Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5t-51.5-4.5q-38 0-73 9.5t-67 26.5Zm-300 134q47 0 91.5 10.5t88.5 31.5v-394q-41-24-87-36t-93-12q-36 0-71.5 7t-68.5 21v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5t91.5-10.5q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394ZM480.72-142.3q-48.24-37.76-104.24-59.72-56-21.96-116.48-21.96-41.18 0-80.9 11.12-39.71 11.12-76.23 30.64-24.35 12.68-47.32-1.15-22.96-13.84-22.96-40.35v-481.76q0-14.35 6.81-27.02 6.82-12.68 20.45-19.02 46.48-23.76 96.72-35.4 50.23-11.65 102.69-11.65 58.5 0 114.24 15 55.74 15 106.5 45.72 51-30.48 106.62-45.6 55.62-15.12 114.12-15.12 52.46 0 102.69 11.65 50.24 11.64 96.72 35.4 13.63 6.34 20.45 19.02 6.81 12.67 6.81 27.02v485.35q0 25.63-22.84 38.23-22.85 12.6-47.44-.32-36.52-19.52-76.23-30.64-39.72-11.12-80.9-11.12-60 0-115.64 22.08-55.64 22.07-103.64 59.6ZM280-485.15Z" />
            </svg>
          )}
          <span className="text-[14px] mt-1.5">Cover Graphics</span>
        </button>
        <button
          onClick={() => onSelect(EPanels.SHAPES)}
          className={`panel-option  ${
            selecedPanel === EPanels.SHAPES ? "active" : ""
          }`}
        >
          {selecedPanel === EPanels.SHAPES ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#00000"
            >
              <path d="m138.38-591.31 115.08-200.31q5.23-8.69 12.33-12.53 7.09-3.85 15.77-3.85 8.67 0 15.75 3.85 7.07 3.84 12.31 12.53l115.07 200.31q5 8.23 4.5 16.45-.5 8.23-4.73 15.63-4 7.27-11.19 11.71-7.19 4.44-16.77 4.44H166.58q-9.58 0-16.77-4.44-7.2-4.44-11.19-11.71-4.24-7.4-4.74-15.63-.5-8.22 4.5-16.45Zm143.93 452.08q-59.08 0-99.93-40.85-40.84-40.84-40.84-99.92t40.84-99.92q40.85-40.85 99.93-40.85 59.07 0 99.92 40.85 40.85 40.84 40.85 99.92t-40.85 99.92q-40.85 40.85-99.92 40.85Zm258.46-32.31v-216.92q0-13.73 9.29-23.02t23.02-9.29H790q13.73 0 23.02 9.29t9.29 23.02v216.92q0 13.73-9.29 23.02T790-139.23H573.08q-13.73 0-23.02-9.29t-9.29-23.02Zm120.15-388.15-34.54-28.08q-52.07-41.85-82.3-78.04-30.23-36.19-30.23-77.96 0-35.77 23.42-59.08 23.42-23.3 59.65-23.3 23.92 0 44.73 11.73 20.81 11.73 39.89 35.27 19.08-22.77 40.65-34.89 21.58-12.11 44.73-12.11 35.17 0 58.74 24.53 23.57 24.54 23.57 60.16 0 41-30.23 76.42t-82.31 77.27l-34.54 28.08q-8.73 7.69-20.63 7.69-11.9 0-20.6-7.69Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="22px"
            >
              <path d="m80-520 200-360 200 360H80Zm200 400q-66 0-113-47t-47-113q0-67 47-113.5T280-440q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T360-280q0-33-23.5-56.5T280-360q-33 0-56.5 23.5T200-280q0 33 23.5 56.5T280-200Zm-64-400h128l-64-115-64 115Zm304 480v-320h320v320H520Zm80-80h160v-160H600v160Zm80-320q-57-48-95.5-81T523-659q-23-25-33-47t-10-47q0-45 31.5-76t78.5-31q27 0 50.5 12.5T680-813q16-22 39.5-34.5T770-860q47 0 78.5 31t31.5 76q0 25-10 47t-33 47q-23 25-61.5 58T680-520Zm0-105q72-60 96-85t24-41q0-13-7.5-21t-20.5-8q-10 0-19.5 5.5T729-755l-49 47-49-47q-14-14-23.5-19.5T588-780q-13 0-20.5 8t-7.5 21q0 16 24 41t96 85Zm0-78Zm-400 45Zm0 378Zm400 0Z" />
            </svg>
          )}
          <span className="text-[14px] mt-1.5">Elements</span>
        </button>

        <button
          onClick={() => onSelect(EPanels.TEXT)}
          className={`panel-option  ${
            selecedPanel === EPanels.TEXT ? "active" : ""
          }`}
        >
          {selecedPanel === EPanels.TEXT ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000000"
            >
              <path d="M414.5-151.87v-525.5H191.87v-130.76h576.26v130.76H545.74v525.5H414.5Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000000"
            >
              <path d="M455.38-200v-510H240.77v-50H720v50H505.38v510h-50Z" />
            </svg>
          )}
          <span className="text-[14px] mt-1.5">Text</span>
        </button>

        <button
          onClick={() => onSelect(EPanels.IMAGES)}
          className={`panel-option ${
            selecedPanel === EPanels.IMAGES ? "active" : ""
          }`}
        >
          {selecedPanel === EPanels.IMAGES ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
            </svg>
          )}
          <span className="text-[14px] mt-1.5">Stock Images</span>
        </button>
        {/* <button
        onClick={() => onSelect(EPanels.TEMPLATES)}
        className={`panel-option ${
          selecedPanel === EPanels.TEMPLATES ? "active" : ""
        }`}>
        {selecedPanel === EPanels.TEMPLATES ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            fill="#000000">
            <path d="M420-420h99.23q8.5 0 14.25-5.76t5.75-14.27q0-8.51-5.75-14.24T519.23-460H420q-8.5 0-14.25 5.76T400-439.97q0 8.51 5.75 14.24T420-420Zm0-120h238.46q8.5 0 14.25-5.76t5.75-14.27q0-8.51-5.75-14.24T658.46-580H420q-8.5 0-14.25 5.76T400-559.97q0 8.51 5.75 14.24T420-540Zm0-120h238.46q8.5 0 14.25-5.76t5.75-14.27q0-8.51-5.75-14.24T658.46-700H420q-8.5 0-14.25 5.76T400-679.97q0 8.51 5.75 14.24T420-660Zm-95.38 380q-27.62 0-46.12-18.5Q260-317 260-344.62v-430.76q0-27.62 18.5-46.12Q297-840 324.62-840h430.76q27.62 0 46.12 18.5Q820-803 820-775.38v430.76q0 27.62-18.5 46.12Q783-280 755.38-280H324.62Zm-120 120q-27.62 0-46.12-18.5Q140-197 140-224.61v-450.77q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75t5.73 14.25v450.77q0 9.23 7.69 16.92 7.69 7.69 16.93 7.69h450.76q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T655.38-160H204.62Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            fill="#000000">
            <path d="M420-420h99.23q8.54 0 14.27-5.73t5.73-14.27q0-8.54-5.73-14.27T519.23-460H420q-8.54 0-14.27 5.73T400-440q0 8.54 5.73 14.27T420-420Zm0-120h238.46q8.54 0 14.27-5.73t5.73-14.27q0-8.54-5.73-14.27T658.46-580H420q-8.54 0-14.27 5.73T400-560q0 8.54 5.73 14.27T420-540Zm0-120h238.46q8.54 0 14.27-5.73t5.73-14.27q0-8.54-5.73-14.27T658.46-700H420q-8.54 0-14.27 5.73T400-680q0 8.54 5.73 14.27T420-660Zm-95.38 380q-27.62 0-46.12-18.5Q260-317 260-344.62v-430.76q0-27.62 18.5-46.12Q297-840 324.62-840h430.76q27.62 0 46.12 18.5Q820-803 820-775.38v430.76q0 27.62-18.5 46.12Q783-280 755.38-280H324.62Zm0-40h430.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-430.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H324.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v430.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69Zm-120 160q-27.62 0-46.12-18.5Q140-197 140-224.61v-450.77q0-8.54 5.73-14.27t14.27-5.73q8.54 0 14.27 5.73t5.73 14.27v450.77q0 9.23 7.69 16.92 7.69 7.69 16.93 7.69h450.76q8.54 0 14.27 5.73t5.73 14.27q0 8.54-5.73 14.27T655.38-160H204.62ZM300-800v480-480Z" />
          </svg>
        )}
        <span className="text-[14px] mt-1.5">Templates</span>
      </button> */}

        <button
          onClick={() => onSelect(EPanels.UPLOADS)}
          className={`panel-option ${
            selecedPanel === EPanels.UPLOADS ? "active" : ""
          }`}
        >
          {selecedPanel === EPanels.UPLOADS ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000000"
            >
              <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#000000"
            >
              <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </svg>
          )}
          <span className="text-[14px] mt-1.5">Uploads</span>
        </button>
        <button
          onClick={() => onSelect(EPanels.PROJECTS)}
          className={`panel-option ${
            selecedPanel === EPanels.PROJECTS ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="22px"
            fill="#000"
          >
            <path d="M320-320h200v-200H320v200Zm0-280h480v-200H320v200Zm280 280h200v-200H600v200Zm-280 80q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Z" />
          </svg>
          <span className="text-[14px] mt-1.5">Projects</span>
        </button>
        {/* <button
          onClick={() => onSelect(EPanels.TEMPLATES)}
          className={`panel-option ${
            selecedPanel === EPanels.TEMPLATES ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="22px"
            fill="#000"
          >
            <path d="M320-320h200v-200H320v200Zm0-280h480v-200H320v200Zm280 280h200v-200H600v200Zm-280 80q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Z" />
          </svg>
          <span className="text-[14px] mt-1.5">Templates</span>
        </button> */}

        {userId == adminID && (
          <button
            onClick={() => onSelect(EPanels.ADMIN)}
            className={`panel-option ${
              selecedPanel === EPanels.ADMIN ? "active" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="undefined"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            <span className="text-[14px] mt-1.5">Admin</span>
          </button>
        )}

        {/* <hr style={{ background: "#e8e8e0" }} className=" w-full px-2 mx-2" /> */}

        {/* <button
          onClick={() =>
            window.open("https://selfpublishingtitans.com/support", "_blank")
          }
          style={{ border: "2px solid #e8e8e0" }}
          className=" px-1 mx-0.5 rounded-md mt-1">
          <span className="text-[14px] ">Report Bug</span>
        </button>
        <button
          onClick={() =>
            window.open("https://selfpublishingtitans.com/support", "_blank")
          }
          style={{ border: "2px solid #e8e8e0" }}
          className=" px-1 mx-0.5 rounded-md mt-1">
          <span className="text-[14px] mt-1.5">Feature Request</span>
        </button>
        <button
          onClick={() =>
            window.open("https://selfpublishingtitans.com/support", "_blank")
          }
          style={{ border: "2px solid #e8e8e0" }}
          className=" px-1 mx-0.5 rounded-md mt-1">
          <span className="text-[14px] mt-1.5">Image Requests</span>
        </button> */}
      </div>
      <span className=" text-black text-center text-[12px] font-medium ">
        Last Updated: 09/09/24 03:04PM UTC
      </span>
    </div>
  );
};

const PanelDisplay = ({
  panel,
  isOwner,
  userID,
  onSelect,
}: {
  panel: EPanels;
  isOwner: boolean;
  userID: string;
  onSelect: (panel: EPanels) => void;
}) => {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    slideLeft: { opacity: 0, x: -100 }, // Slide to left variant
  };

  return (
    <motion.div
      key={panel}
      initial="initial"
      animate="animate"
      exit={panel === EPanels.NONE ? "slideLeft" : "exit"} // Apply slideLeft variant when closing
      variants={variants}
      transition={{ duration: 0.3 }}
      className="panel-content"
    >
      {panel !== EPanels.NONE && (
        <CircleChevronLeft
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer",
            zIndex: 100,
          }}
          onClick={() => onSelect(EPanels.NONE)}
        />
      )}
      {getPanelContent(panel, isOwner, userID)}
    </motion.div>
  );
};

const getPanelContent = (panel: EPanels, isOwner: boolean, userID: string) => {
  switch (panel) {
    case EPanels.TEXT:
      return <TextSideBar />;
    case EPanels.SHAPES:
      return <ShapesPanel hasPurchased={isOwner} />;
    case EPanels.IMAGES:
      return <ImagesPanel />;
    case EPanels.TEMPLATES:
      return <TemplatesPanel />;
    case EPanels.BookCovers:
      return <CoverImages hasPurchased={isOwner} />;
    case EPanels.UPLOADS:
      return <UploadsPanel />;
    case EPanels.PROJECTS:
      return <ProjectsPanel userID={userID} />;

    case EPanels.ADMIN:
      return <AdminPanel hasPurchased={isOwner} />;

    default:
      return null;
  }
};

// create table if not exists templates (
// 	id bigserial primary key,
// 	name text not null default '',
// 	category text not null default '',
// 	subcategory text not null default '',
// 	content text not null default '',
// 	updated_at timestamp not null default current_timestamp
// )
