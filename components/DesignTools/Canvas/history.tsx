import { useEffect, useRef, useState, useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";

function simulateKeyEvent(key, eventType = "keydown", ctrlKey = false) {
  const event = new KeyboardEvent(eventType, {
    key: key,
    ctrlKey: ctrlKey,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
}

function UndoRedoComp() {
  // @ts-ignore
  const { canvas } = useContext(CanvasContext) || { canvas: null };
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const isHistoryLoading = useRef(false);

  const [undoCount, setUndoCount] = useState(0);
  const [redoCount, setRedoCount] = useState(0);

  useEffect(() => {
    if (!canvas) return;

    const saveState = () => {
      if (isHistoryLoading.current) return;
      const json = canvas.toJSON();
      undoStack.current.push(json);
      redoStack.current = [];
      setUndoCount(undoStack.current.length);
      setRedoCount(redoStack.current.length);
    };

    const undo = () => {
      if (undoStack.current.length === 0) return;

      isHistoryLoading.current = true;

      const currentState = canvas.toJSON();
      redoStack.current.push(currentState);
      const previousState = undoStack.current.pop();
      canvas
        .loadFromJSON(previousState, () => {
          canvas.renderAll();
        })
        .then(() => {
          isHistoryLoading.current = false;
          canvas.renderAll();
          setUndoCount(undoStack.current.length);
          setRedoCount(redoStack.current.length);
        });
    };

    const redo = () => {
      if (redoStack.current.length === 0) return;

      isHistoryLoading.current = true;

      const currentState = canvas.toJSON();
      undoStack.current.push(currentState);
      const nextState = redoStack.current.pop();

      canvas
        .loadFromJSON(nextState, () => {
          canvas.renderAll();
        })
        .then(() => {
          isHistoryLoading.current = false;
          canvas.renderAll();
          setUndoCount(undoStack.current.length);
          setRedoCount(redoStack.current.length);
        });
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        undo();
      } else if (e.ctrlKey && e.key === "y") {
        redo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    canvas.on("object:added", saveState);
    canvas.on("object:modified", saveState);
    canvas.on("object:removed", saveState);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      canvas.off("object:added", saveState);
      canvas.off("object:modified", saveState);
      canvas.off("object:removed", saveState);
    };
  }, [canvas]);

  const handleUndo = () => {
    simulateKeyEvent("z", "keydown", true);
    simulateKeyEvent("z", "keyup", true);
  };

  const handleRedo = () => {
    simulateKeyEvent("y", "keydown", true);
    simulateKeyEvent("y", "keyup", true);
  };

  return (
    <div className="flex gap-2 pr-2 items-center w-full">
      <button
        className="flex w-full  font-medium  hover:bg-blue-200  transition-all rounded-xl gap-3 justify-center items-center"
        onClick={handleUndo}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#000000"
        >
          <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z" />
        </svg>{" "}
        {/* {undoCount} */}
        Undo{" "}
      </button>
      <button
        className="flex w-full  font-medium  hover:bg-blue-200  transition-all rounded-xl gap-3 justify-center items-center"
        onClick={handleRedo}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#000000"
        >
          <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z" />
        </svg>
        Redo {/* {redoCount} */}
      </button>
    </div>
  );
}

export default UndoRedoComp;
