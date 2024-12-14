import React, { useState, FC, useEffect } from "react";
import AddColumnButton from "@/components/planner/board/columns/buttons/add-column-button";
import CardDetailsModal from "@/components/planner/board/columns/modals/card-details-modal";
import Column from "@/components/planner/board/columns/column";
import LoadingBar from "@/components/utils/LoadingBar";

import {
  Board as TBoard,
  Column as TColumn,
  TCard,
} from "@/lib/ts/types/planner";

import shortId from "shortid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BoardColumnsProps {
  board: TBoard;
}

const updateColumnSequence = async ({ _id, sequence, boardId }) => {
  const data = {
    _id,
    sequence,
  };
  const url = `/api/boards/${boardId}/columns/${_id}`;
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

const updateCardSequence = async (obj) => {
  const { _id, title, description, columnId, sequence, board } = obj;

  const data = {
    title,
    description,
    columnId,
    sequence,
  };

  const url = `/api/boards/${board._id}/cards/${_id}`;

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

const BoardColumns: FC<BoardColumnsProps> = ({ board }): JSX.Element => {
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  async function AddColumnToBoard(columnId: string, title: string) {
    const columsArray = columns || [];
    let sequence = 1;

    if (columns.length > 0) {
      sequence = columsArray[columsArray.length - 1].sequence + 1;
    }

    const data = {
      id: columnId,
      boardId: board._id,
      columnName: title,
      dateCreated: new Date().toLocaleString(),
      userId: board.createdBy,
      sequence,
    };

    const url = `/api/boards/${data.boardId}/columns`;

    const columnData: TColumn = {
      _id: columnId,
      boardId: board._id,
      columnName: title,
      sequence: sequence,
      dateCreated: new Date().toLocaleString(),
      userId: board.createdBy,
      boardName: board.name,
    };

    setColumns([...columns, columnData]);

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

    console.log("response", response);

    const inJSON = await response.json();
  }

  console.log("board cards", cards);

  async function fetchCards() {
    const url = `/api/boards/${board._id}/cards`;
    const response = await fetch(url).then((response) => response.json());
    console.log("fetch cards response", response);
    setCards(response);
  }

  async function fetchColumns() {
    const response = await fetch(`/api/boards/${board._id}/columns`).then(
      (response) => response.json()
    );
    setColumns(response);
  }

  async function fetchBoard() {
    try {
      setLoading(true);
      await fetchColumns();
      await fetchCards();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (board) {
      fetchBoard();
    }
  }, [board]);

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [cardDetail, setCardDetail] = useState<any>({
    _id: "",
    title: "",
    description: "",
  });

  const [showTextBox, setShowTextBox] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const showCardDetail = (cardId: string) => {
    const card = cards.filter((card) => card._id === cardId);

    setCardDetail(card[0]);
    onOpen();
  };

  const addColumn = async () => {
    const columnId = shortId.generate();

    await AddColumnToBoard(columnId, columnTitle);
  };

  const filterCards = (columnId: string) => {
    const filteredCards = cards.filter((card) => card.columnId === columnId);
    return filteredCards;
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    // Don't do anything where there is not destination
    if (!destination) {
      return;
    }

    // Do nothing if the card is put back where it was
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If card is being dragged
    if (type === "card") {
      await saveCardSequence(
        destination.index,
        destination.droppableId,
        draggableId
      );
    }

    // If column is being dragged
    if (type === "column") {
      await saveColumnSequence(destination.index, draggableId);
    }
  };

  const saveCardSequence = async (
    destinationIndex: number,
    destinationColumnId: string,
    cardId: string
  ) => {
    const cardsFromColumn = cards.filter(
      (card) => card.columnId === destinationColumnId && card._id !== cardId
    );
    const sortedCards = cardsFromColumn.sort((a, b) => a.sequence - b.sequence);

    let newSequence =
      destinationIndex === 0
        ? 1
        : sortedCards[destinationIndex - 1].sequence + 1;

    // Update the sequence numbers of the cards in the destination column
    const updatedCards = cards.map((card) => {
      if (card._id === cardId) {
        return {
          ...card,
          sequence: newSequence,
          columnId: destinationColumnId,
        };
      } else if (
        card.columnId === destinationColumnId &&
        card.sequence >= newSequence
      ) {
        return { ...card, sequence: card.sequence + 1 };
      } else {
        return card;
      }
    });

    // Sort the updated cards by sequence to ensure correct order
    const uniqueUpdatedCards = updatedCards.sort(
      (a, b) => a.sequence - b.sequence
    );

    setCards(uniqueUpdatedCards);

    // Update the card sequence in the database
    const patchCard = {
      _id: cardId,
      sequence: newSequence,
      columnId: destinationColumnId,
      board,
    };

    await updateCardSequence(patchCard);

    // Update the sequence numbers of the other cards in the column in the database
    for (let i = destinationIndex; i < sortedCards.length; i++) {
      const card = sortedCards[i];
      newSequence += 1;

      const patchCard = {
        _id: card._id,
        sequence: newSequence,
        columnId: destinationColumnId,
        board,
      };

      await updateCardSequence(patchCard);
    }
  };

  function UpdateColumnSequenceState(patch) {
    setColumns((prevCards) => {
      const cardIndex = prevCards.findIndex((card) => card._id === patch._id);
      if (cardIndex === -1) {
        return prevCards;
      }
      const updatedCard = { ...prevCards[cardIndex], sequence: patch.sequence };
      const updatedCards = prevCards.map((card) => {
        if (card._id === patch._id) {
          return updatedCard;
        } else if (card.sequence >= patch.sequence) {
          return { ...card, sequence: card.sequence + 1 };
        } else {
          return card;
        }
      });
      const sortedCards = updatedCards.sort((a, b) => a.sequence - b.sequence);
      return sortedCards;
    });
  }

  console.log("columns", columns);

  const saveColumnSequence = async (
    destinationIndex: number,
    columnId: string
  ) => {
    // Remove the column which is dragged from the list
    const filteredColumns = columns.filter((column) => column._id !== columnId);

    const sortedColumns = filteredColumns.sort(
      (a, b) => a.sequence - b.sequence
    );

    let sequence =
      destinationIndex === 0
        ? 1
        : sortedColumns[destinationIndex - 1].sequence + 1;

    const patchColumn = {
      _id: columnId,
      sequence,
      boardId: board._id,
    };

    UpdateColumnSequenceState(patchColumn);

    await updateColumnSequence(patchColumn);

    for (let i = destinationIndex; i < sortedColumns.length; i++) {
      const column = sortedColumns[i];

      sequence += 1;

      const patchColumn = {
        _id: column._id,
        sequence,
        boardId: board._id,
      };

      await updateColumnSequence(patchColumn);
    }
    // window.location.reload();
  };

  return (
    <>
      <LoadingBar isLoading={loading} title="Loading board" />
      <div
        style={{
          display: "block",
          position: "relative",
          height: "calc(100vh - 90px)",
          overflowX: "auto",
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-collumns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // display="flex"
                // position="absolute"
                // overflowY="auto"
                style={{
                  display: "flex",
                  position: "absolute",
                  marginTop: "20px",
                  gap: "13px",
                  marginLeft: "20px",
                }}
              >
                {columns.map((column, index) => (
                  <Column
                    key={column._id}
                    column={column}
                    id={column._id}
                    index={index}
                    cards={filterCards(column._id)}
                    showCardDetail={showCardDetail}
                    board={board}
                    setColumns={setColumns}
                    setCards={setCards}
                    userId={undefined}
                  />
                ))}
                {provided.placeholder}
                <div
                  className="h-fit"
                  style={{
                    backgroundColor: "#F0F0F0",
                    padding: "10px",
                    width: "272px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "10px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {showTextBox ? (
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        placeholder="Enter column name"
                        value={columnTitle}
                        style={{
                          width: "100%",
                        }}
                        className="bg-white"
                        onChange={(e) => setColumnTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (!columnTitle)
                              return alert("Please enter a column name");
                            setShowTextBox(false);
                            addColumn();
                          }
                        }}
                      />
                      <div className="flex gap-2 w-full">
                        <Button
                          variant="ghost"
                          className=""
                          style={{
                            width: "50%",
                          }}
                          onClick={() => setShowTextBox(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="rounded-full"
                          onClick={() => {
                            if (!columnTitle)
                              return alert("Please enter a column name");
                            addColumn();
                            setShowTextBox(false);
                          }}
                          style={{
                            width: "50%",
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <AddColumnButton
                      addColumn={addColumn}
                      setShowInput={setShowTextBox}
                    />
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isOpen && (
          <CardDetailsModal
            isOpen={isOpen}
            board={board}
            onClose={onClose}
            card={cards.find((card) => card._id === cardDetail._id)}
            setCards={setCards}
          />
        )}
      </div>
    </>
  );
};

export default BoardColumns;
