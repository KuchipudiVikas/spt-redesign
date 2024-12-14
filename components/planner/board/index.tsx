import React from "react";

import { useState } from "react";
import { nanoid } from "nanoid";

import BoardColumns from "@/components/planner/board/columns";
import { useEffect } from "react";
import { Board as TBoard, Column as TColumn } from "@/lib/ts/types/planner";
import LoadingBar from "@/components/utils/LoadingBar";

interface BoardProps {
  info: any;
}

const Board: React.FC<BoardProps> = ({ info }) => {
  console.log("info", info);

  const [board, setBoard] = useState<TBoard | null>(null);
  const userId = info._id;
  const [loading, setLoading] = useState(false);

  async function AddColumnToBoard(
    columnId: string,
    title: string,
    boardId: string,
    sequence: number
  ) {
    const data = {
      id: columnId,
      boardId: boardId,
      columnName: title,
      dateCreated: new Date().toLocaleString(),
      userId: board.createdBy,
      sequence,
    };

    const url = `/api/boards/${data.boardId}/columns`;
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
    return inJSON;
  }

  async function createBoard() {
    try {
      setLoading(true);
      const data = {
        _id: nanoid(),
        name: "Book Planner Board",
        dateCreated: Date.now(),
        createdBy: userId,
        backgroundImage: "/boards/board-background.jpg",
      };

      const url = `/api/boards`;
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

      const predefinedCols = [
        "Book Ideas",
        "Niche Ideas",
        "Keywords",
        "My Books",
        "Competitors",
      ];

      // await Promise.all(
      //   predefinedCols.map((col, index) =>
      //     AddColumnToBoard(nanoid(), col, data._id, index + 1)
      //   )
      // );

      return getBoardData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function getBoardData() {
    console.log("getting board data");
    const url = `/api/boards/${userId}`;
    const response = await fetch(url);
    const json = await response.json();
    const { board } = json;
    if (!json.boardFound) {
      setBoard(null);
      return createBoard();
    } else {
      setBoard(board);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBoardData();
  }, []);

  return (
    <>
      <LoadingBar isLoading={loading} title="Creating new board" />
      <div
        style={{
          backgroundImage: `url('${board?.backgroundImage}')`,
          backgroundPosition: "center",
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <SubNavbar board={board} /> */}
        <BoardColumns board={board} />
      </div>
    </>
  );
};

export default Board;
