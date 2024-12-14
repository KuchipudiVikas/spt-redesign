import React, { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TCard, TFile } from "@/lib/ts/types/planner";
import LinkPreview from "./LinkPreview";
import axios from "axios";
import FilePreview from "./FilePreview";
import { nanoid } from "nanoid";

function findFirstLink(text: string): string | null {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  return matches ? matches[0] : null;
}

type Props = {
  showCardDetail: (cardId: string) => void;
  cardIndex: number;
  card: TCard;
  setCards: (cards: TCard[]) => void;
};

const Card: FC<Props> = ({ cardIndex, showCardDetail, card, setCards }) => {
  const [droppedFiles, setDroppedFiles] = useState<TFile[]>([]);

  const [updating, setUpdating] = useState(false);

  const updateCard = async (obj) => {
    try {
      setUpdating(true);
      const url = `/api/boards/${card.boardId}/cards/${obj.id}`;

      const response = await fetch(url, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(obj),
      });

      const inJSON = await response.json();

      return inJSON;
    } catch (error) {
    } finally {
      setUpdating(false);
    }
  };

  const firstLink = findFirstLink(card.title);

  const handleDrop = async (e) => {
    // e.preventDefault();
    setIsDragging(false);
    const textData = e.dataTransfer.getData("text/plain");
    const files = e.dataTransfer.files;

    if (textData) {
      console.log("Dropped text data:", textData);
    }

    let filesData: TFile[] = [];
    let uploadPromises = [];
    let cardTitle = "";

    if (files && files.length > 0) {
      console.log("Dropped files:", files);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeMB = file.size / 1024 / 1024;
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (fileSizeMB > 5) {
          console.log(`File ${i} is too large: ${fileSizeMB.toFixed(2)} MB`);
          continue;
        }

        if (!allowedTypes.includes(file.type)) {
          console.log(`File ${i} has an unsupported file type: ${file.type}`);
          continue;
        }

        if (i == 0) {
          cardTitle = file.name;
        }

        const reader = new FileReader();
        const uploadPromise = new Promise((resolve, reject) => {
          reader.onloadend = async () => {
            try {
              // @ts-ignore
              const base64String = reader.result.split(",")[1];

              const res = {
                _id: nanoid(),
                fileName: file.name,
                fileType: file.type,
                fileData: base64String,
              };

              const filedata = res;
              filesData.push(filedata);
              console.log(`File ${i} uploaded successfully`);
              // @ts-ignore
              resolve();
            } catch (error) {
              console.error(`Error uploading file ${i}:`, error);
              reject(error);
            }
          };
          reader.readAsDataURL(file);
        });

        uploadPromises.push(uploadPromise);
      }
    }

    await Promise.all(uploadPromises);

    console.log("Files data:", filesData);
    const updatedCard = {
      ...card,
      files: [...(card.files || []), ...filesData],
    };
    await updateCard(updatedCard);

    // @ts-ignore
    setCards((prev: TCard[]) => {
      const updatedCards = prev.map((c) => {
        if (c._id === card._id) {
          return updatedCard;
        }
        return c;
      });
      return updatedCards;
    });

    alert("Attachment uploaded successfully");
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    // e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    // e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDropWrapper = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleDrop(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <Draggable draggableId={card._id} index={cardIndex} key={card._id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => showCardDetail(card._id)}
        >
          <div
            style={{
              borderRadius: "10px",
              border: isDragging ? "2px solid blue" : "1px solid transparent",
              transition: "border-color 0.3s",
              width: "300px",
            }}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDropWrapper}
            className="bg-white p-4 m-2 rounded-md"
          >
            <div className="">
              {card.files && card.files.length > 0 && (
                <div className="">
                  <FilePreview file={card.files[0]} />
                </div>
              )}
            </div>
            {firstLink ? (
              <LinkPreview url={firstLink} />
            ) : (
              <h6 className="leading-5 font-medium">{card.title}</h6>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default Card;
