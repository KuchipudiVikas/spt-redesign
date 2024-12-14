import React, { FC, useState } from "react";

import {
  AiOutlineDelete,
  AiOutlineClose,
  AiOutlineLaptop,
  AiOutlineDown,
  AiOutlineDownload,
  AiOutlineFile,
} from "react-icons/ai";
import { GrTextAlignFull } from "react-icons/gr";
import CardLabel from "@/components/planner/board/columns/modals/card-labels-menu";
import QuillEditor from "@/components/planner/quill-editor";

import { TCard, TFile, Board } from "@/lib/ts/types/planner";
import FilePreview from "../FilePreview";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { PencilIcon, XIcon } from "lucide-react";
import { DialogContent } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  card: TCard;
  board: Board;
  setCards: any;
};

const CardDetailsModal: FC<Props> = ({
  onClose,
  isOpen,
  card,
  board,
  setCards,
}) => {
  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);
  //
  // const [assigned, assignUser] = useState(card?.assignedTo);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const updateCard = async (obj) => {
    try {
      setUpdating(true);
      const url = `/api/boards/${board._id}/cards/${obj._id}`;

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

      console.log("updated card", inJSON);

      setCards((prev) => {
        const updatedCards = prev.map((c) => {
          if (c._id === obj._id) {
            const updatedCard = {
              ...c,
              title,
              description,
              files: obj.files || [],
            };
            return updatedCard;
          }

          return c;
        });

        return updatedCards;
      });

      return inJSON;
    } catch (error) {
    } finally {
      setUpdating(false);
    }
  };

  const deleteCard = async () => {
    try {
      setDeleting(true);
      const url = `/api/boards/${board._id}/cards/${card._id}`;

      const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });

      const inJSON = await response.json();

      setCards((prev) => prev.filter((c) => c._id !== card._id));

      return inJSON;
    } catch (error) {
    } finally {
      setDeleting(false);
    }
  };

  const handleCardDelete = async () => {
    // delete card
    await deleteCard();

    onClose();
  };

  const handleModalClose = async () => {
    const data = {
      _id: card._id,
      title,
      description,
      columnId: card.columnId,
      // assignedTo: assigned,
    };

    // await dispatch(updateCard(data));
    await updateCard(data);

    // await dispatch(fetchCards());

    onClose();
  };

  const handleClick = async (userId) => {
    // assignUser(userId);

    const data = {
      _id: card._id,
      title,
      description,
      columnId: card.columnId,
      assignedTo: userId,
    };

    await updateCard(data);
    onClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [isUpdating, setUpdating] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  return (
    <Dialog open={isOpen}>
      <div className="flex justify-end cursor-pointer p-2">
        <XIcon onClick={() => onClose()} />
      </div>

      <DialogContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <AiOutlineLaptop />
          <Input
            name="title"
            className="ml-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card title"
          />
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              marginTop: "2rem",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <GrTextAlignFull />
              <h6 style={{ marginLeft: "1rem" }}>Description</h6>
            </div>
            <div
              style={{
                marginLeft: "1.5rem",
                minHeight: "200px",
              }}
            >
              <QuillEditor value={description} onChange={setDescription} />
            </div>
          </div>
        </div>
        {/* display files here */}
        <FileList files={card.files} card={card} updateCard={updateCard} />
        <DialogFooter>
          <Button
            onClick={handleCardDelete}
            // disabled={cardDelete}

            color="secondary"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <Button onClick={handleModalClose} color="primary">
            {isUpdating ? "Updating..." : "Update"} <PencilIcon />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardDetailsModal;

interface FileListProps {
  files: TFile[];
  card: TCard;
  updateCard: (card: TCard) => void;
}
function FileList({ files, card, updateCard }: FileListProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<TFile | null>(null);

  const handleOpen = (file: TFile) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  async function handleDeleteFile(file: TFile) {
    // update the carrd with the file removed
    const updatedCard = {
      ...card,
      files: card.files.filter((f) => f._id !== file._id),
    };

    console.log("updated card", updatedCard);

    updateCard(updatedCard);
  }

  if (!files || files.length === 0) return null;

  return (
    <div
      // display="flex"
      // className="ml-2"
      // flexDirection="column"
      // marginTop="1rem"
      className="flex flex-col items-center ml-2 mt-4"
    >
      <h6 className="flex font-bold items-center">
        <AiOutlineFile className="mr-2" /> Attachments
      </h6>
      <div
        // className="w-[90%]"
        // display="flex"
        // flexDirection="column"
        // marginTop="1rem"
        className="flex flex-col items-center w-[90%] mt-2"
      >
        {files.map((file, index) => (
          <div
            key={index}
            // display="flex"
            // alignItems="center"
            // justifyContent={"space-between"}
            // marginBottom="1rem"
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <div
                // width="50px"
                // height="50px"
                // className="flex items-center"
                // marginRight="1rem"
                style={{ width: 50, height: 50 }}
                className="flex items-center mr-2 "
              >
                <FilePreview file={file} previewSize="small" />
              </div>
              <h6
                onClick={() => handleOpen(file)}
                style={{ cursor: "pointer" }}
              >
                {file.fileName}
              </h6>
            </div>
            <div className="flex items-center gap-3">
              <Button>
                <a
                  href={`data:${file.fileType};base64,${file.fileData}`}
                  download={file.fileName}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <AiOutlineDownload />
                </a>
              </Button>
              <Button>
                <AiOutlineDelete onClick={() => handleDeleteFile(file)} />
                {/* <AiOutlineClose /> */}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              boxShadow: "24px",
              padding: "16px",
            }}
          >
            {selectedFile && (
              <FilePreview file={selectedFile} previewSize="large" />
            )}
            <Button
              onClick={handleClose}
              style={{ position: "absolute", top: -5, right: -5 }}
            >
              <AiOutlineClose />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
