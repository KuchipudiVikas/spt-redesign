import React, { useState, useCallback } from "react";

import Cards from "./cards";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { GrDrag } from "react-icons/gr";
import shortId from "shortid";

import { debounce, set } from "lodash";
import axios from "axios";
import { TCard, TFile } from "@/lib/ts/types/planner";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Pencil1Icon } from "@radix-ui/react-icons";

const Column = ({
  showCardDetail,
  column,
  index,
  id,
  cards,
  userId,
  board,
  setColumns,
  setCards,
}) => {
  const [showEditBox, setEditBoxVisibility] = useState<boolean>(false);

  const [columnName, setColumnName] = useState<string>(column.columnName);
  const cardsInSortedSequence = cards.sort(
    (cardA: any, cardB: any) => cardA.sequence - cardB.sequence
  );

  const loadColumnTitle = (draggableProps) => {
    if (showEditBox) {
      return (
        <Input
          // bg="white"
          value={columnName}
          // size="xs"
          // width="60%"
          // ml="20px"
          style={{
            width: "60%",
            backgroundColor: "white",
            marginLeft: "60px",
          }}
          onChange={handleChange}
          onBlur={() => setEditBoxVisibility(false)}
          onKeyDown={handleKeyDown}
        />
      );
    }

    return (
      <h6
        {...draggableProps}
        // as="h6"
        // size="sm"
        // ml="10px"
        // mt="5px"
        textAlign="center"
        style={{
          cursor: "pointer",
          padding: "5px",
          borderRadius: "5px",
          backgroundColor: "#F0F0F0",
          marginLeft: "10px",
        }}
      >
        <div className="flex items-center gap-3">
          <GrDrag /> {columnName}
        </div>
      </h6>
    );
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setEditBoxVisibility(false);
    }
  };

  const [cardTitle, setCardTitle] = useState<string>("");

  const handleCardAdd = async (files, title) => {
    try {
      setIsAdding(true);
      await addCard(files, title);
    } catch (e) {
    } finally {
      setShowAddField(false);
      setIsAdding(false);
    }
  };

  const addCard = async (files, title) => {
    const filteredCards = cards.filter((card) => card.columnId === column._id);

    let sequence = 1;

    if (filteredCards.length > 0) {
      sequence = filteredCards[filteredCards.length - 1].sequence + 1;
    }

    const cardId = shortId.generate();

    const data = {
      _id: cardId,
      columnId: column._id,
      boardId: column.boardId,
      title: title,
      type: "",
      description: "",
      dateCreated: new Date().toLocaleString(),
      userId: userId,
      assignedTo: "",
      sequence,
      files,
    };

    const url = `/api/boards/${column.boardId}/columns/${column._id}/cards`;

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    const inJSON = await response.json();

    setCards((prevCards) => {
      return [...prevCards, data];
    });

    return inJSON;
  };

  const [showAddField, setShowAddField] = useState<boolean>(false);

  const handleChange = (e) => {
    setColumnName(e.target.value);
    handleColumnNameChange(e.target.value);
  };

  const deleteColumn = async () => {
    const url = `/api/boards/${board._id}/columns/${id}`;

    setColumns((prevColumns) => {
      const newColumns = prevColumns.filter((col) => col._id !== id);
      return newColumns;
    });

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
    // remove the column from the columns array
  };

  const handleColumnDelete = async () => {
    await deleteColumn();
  };

  const handleColumnNameChange = useCallback(
    debounce((value) => nameChange(value), 800),
    []
  );

  const updateColumn = async (name: string) => {
    const data = {
      _id: column._id,
      boardName: board.name,
      columnName: name,
    };

    const url = `/api/boards/${board._id}/columns/${column._id}`;

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
      body: JSON.stringify(data),
    });

    const inJSON = await response.json();

    return inJSON;
  };

  const nameChange = async (value) => {
    const data = {
      columnName: value,
      columnId: column._id,
    };

    await updateColumn(value);

    // Update the name in the state
    setColumns((prevColumns) => {
      return prevColumns.map((col) =>
        col._id === column._id ? { ...col, columnName: value } : col
      );
    });
  };

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const loaderStyle = {
    width: "30px",
    aspectRatio: "2",
    "--_g": "no-repeat radial-gradient(circle closest-side,#000 90%,#0000)",
    background: `
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%
  `,
    backgroundSize: "calc(100%/3) 50%",
    animation: "l3 1s infinite linear",
  };

  const keyframesStyle = `
  @keyframes l3 {
    20% { background-position: 0% 0%, 50% 50%, 100% 50% }
    40% { background-position: 0% 100%, 50% 0%, 100% 50% }
    60% { background-position: 0% 50%, 50% 100%, 100% 0% }
    80% { background-position: 0% 50%, 50% 50%, 100% 100% }
  } `;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "Add New");
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e) => {
    e.preventDefault();
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
      setIsAdding(true);
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

              // const res = await axios.post("/api/upload", {
              //   fileName: file.name,
              //   fileType: file.type,
              //   fileData: base64String,
              // });

              const res = {
                fileData: base64String,
                fileName: file.name,
                fileType: file.type,
                _id: nanoid(),
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

    handleCardAdd(filesData, cardTitle);
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  return (
    <Draggable draggableId={column._id} index={index} key={column._id}>
      {(provided) => (
        <div
          key={index}
          // width="272px"
          // height="calc(100vh - 90px)"
          // overflowY="auto"
          // mt="10px"
          // mx="10px"
          style={{
            width: "272px",
            height: "calc(100vh - 90px)",
            overflowY: "auto",
            marginTop: "10px",
            marginLeft: "10px",
          }}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            // bg={column.columnName === "addColumn" ? "" : "#F0F0F0"}

            // pb="5px"
            // rounded="lg"
            style={{
              backgroundColor:
                column.columnName === "addColumn" ? "" : "#F0F0F0",

              padding: "5px",
            }}
            className="sp-container border rounded-2xl light-border border-2"
          >
            <div
              // alignItems="center"
              // justifyContent="space-between"
              className="flex justify-between items-center"
            >
              {loadColumnTitle(provided.dragHandleProps)}
              <div
                className="flex mr-[10px] cursor-grab my-[10px]"
                style={{
                  cursor: "grab",
                }}
              >
                {/* <Menu>
                  <Button aria-label="Options">
                    <FiMoreHorizontal />
                  </Button>
                  <MenuList justifyContent="center" alignItems="center">
                    <MenuItem
                      onClick={() => setEditBoxVisibility(!showEditBox)}
                    >
                      <AiOutlineEdit />
                      <Text marginLeft="5px">Edit</Text>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleColumnDelete}>
                      <AiOutlineDelete />
                      <Text marginLeft="5px">Delete</Text>
                    </MenuItem>
                  </MenuList>
                </Menu> */}
                <BasicMenu
                  handleColumnDelete={handleColumnDelete}
                  setEditBoxVisibility={setEditBoxVisibility}
                  editBoxVisibility={showEditBox}
                />
              </div>
            </div>
            <Droppable droppableId={column._id} type="card">
              {(provided) => (
                // 2px height is needed to make the drop work when there is no card.
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  minHeight="2px"
                >
                  <Cards
                    showCardDetail={showCardDetail}
                    cards={cardsInSortedSequence}
                    setCards={setCards}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {isAdding ? (
              <div className="flex justify-center items-center">
                <>
                  <style>{keyframesStyle}</style>
                  <div style={loaderStyle}></div>
                </>
              </div>
            ) : showAddField ? (
              <div className="flex flex-col gap-2">
                <Textarea
                  onChange={(e) => {
                    setCardTitle(e.target.value);
                  }}
                  style={{
                    width: "100%",
                  }}
                  className="bg-white px-2"
                  placeholder="Add item"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      setShowAddField(false);
                      handleCardAdd([], cardTitle);
                    }
                  }}
                />
                <div className="flex gap-4 w-full">
                  <Button
                    style={{
                      width: "50%",
                    }}
                    className="rounded-full"
                    variant="ghost"
                    onClick={() => {
                      setCardTitle("");
                      setShowAddField(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{
                      width: "50%",
                    }}
                    className=" rounded-full text-white font-bold py-2 flex justify-center px-4 "
                    onClick={() => {
                      if (!cardTitle)
                        return alert("Card title should not be empty");
                      handleCardAdd([], cardTitle);
                    }}
                  >
                    {isAdding ? (
                      <>
                        <style>{keyframesStyle}</style>
                        <div style={loaderStyle}></div>
                      </>
                    ) : (
                      "Add"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                style={{
                  borderRadius: "10px",
                  border: isDragging
                    ? "2px solid blue"
                    : "1px solid transparent",
                  transition: "border-color 0.3s",
                }}
              >
                <button
                  className="flex w-full bg-transparent py-2 justify-center"
                  draggable
                  onDragStart={handleDragStart}
                  onClick={() => {
                    setShowAddField(true);
                  }}
                >
                  + Add New
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;

interface BasicMenuProps {
  handleColumnDelete: () => void;
  setEditBoxVisibility: (boolean) => void;
  editBoxVisibility: boolean;
}

function BasicMenu({
  handleColumnDelete,
  setEditBoxVisibility,
  editBoxVisibility,
}: BasicMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {/* <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          > */}
          <EllipsisVerticalIcon className="w-4" />
          {/* </Button> */}
        </PopoverTrigger>
        <PopoverContent>
          <Button
            className="flex items-center gap-3"
            onClick={() => setEditBoxVisibility(!editBoxVisibility)}
          >
            <Pencil1Icon />
            Edit
          </Button>
          <Button
            className="flex items-center gap-3"
            onClick={() => handleColumnDelete()}
          >
            <TrashIcon />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
