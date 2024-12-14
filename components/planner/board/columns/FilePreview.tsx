import { TCard, TFile } from "@/lib/ts/types/planner";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

type FilePreviewProps = {
  file: TFile;
  previewSize?: "small" | "medium" | "large";
};

const FilePreview: FC<FilePreviewProps> = ({
  file,
  previewSize = "medium",
}) => {
  const { fileName, fileType, fileData } = file;

  if (fileType.startsWith("image/")) {
    return (
      <Image
        src={`data:${fileType};base64,${fileData}`}
        alt={fileName}
        style={{ maxWidth: "100%" }}
        width={300}
        height={300}
        className="rounded-md w-full h-fit object-cover"
      />
    );
  } else if (fileType === "application/pdf") {
    return (
      <object
        data={`data:${fileType};base64,${fileData}`}
        type={fileType}
        width={
          previewSize === "small"
            ? "100%"
            : previewSize === "medium"
            ? "100%"
            : 800
        }
        height={
          previewSize === "small" ? 60 : previewSize === "medium" ? 200 : 800
        }
        className="overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <p>
          PDF cannot be displayed.{" "}
          <a href={`data:${fileType};base64,${fileData}`} download={fileName}>
            Download PDF
          </a>
        </p>
      </object>
    );
  } else if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      <a href={`data:${fileType};base64,${fileData}`} download={fileName}>
        Download {fileName}
      </a>
    );
  } else {
    return <p>Unsupported file type</p>;
  }
};

export default FilePreview;
