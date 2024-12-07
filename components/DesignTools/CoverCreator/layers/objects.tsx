import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import Image from "next/image";
import { debounce } from "lodash";
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FaGripVertical,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import OpacitySlider from "./opacity";

interface ObjectsTabProps {}

const ObjectsTab = ({}: ObjectsTabProps) => {
  const { canvas } = useContext(CanvasContext) || {};
  const [objects, setObjects] = useState<any[]>([]);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [opacity, setOpacity] = useState<number>(1);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});
  const [lockStatus, setLockStatus] = useState<{ [key: string]: boolean }>({});
  const [editingObject, setEditingObject] = useState<any>(null);
  const [newName, setNewName] = useState<string>("");

  const updateObjects = useCallback(
    debounce(() => {
      if (canvas) {
        const objs = canvas.getObjects().reverse();
        setObjects(objs);
        const visibilityState = objs.reduce((acc: any, obj: any) => {
          acc[obj.uid] = obj.visible;
          return acc;
        }, {});
        setVisibility(visibilityState);
        const lockState = objs.reduce((acc: any, obj: any) => {
          acc[obj.uid] = obj.locked !== undefined ? obj.locked : true;
          return acc;
        }, {});
        setLockStatus(lockState);
      }
    }, 300),
    [canvas]
  );

  useEffect(() => {
    if (canvas) {
      const handleSelection = (e: any) => {
        setSelectedObject(e.selected[0]);
        setOpacity(e.selected[0]?.opacity || 1);
      };

      updateObjects();

      canvas.on("object:added", updateObjects);
      canvas.on("object:removed", updateObjects);
      canvas.on("object:modified", updateObjects);
      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);

      return () => {
        canvas.off("object:added", updateObjects);
        canvas.off("object:removed", updateObjects);
        canvas.off("object:modified", updateObjects);
        canvas.off("selection:created", handleSelection);
        canvas.off("selection:updated", handleSelection);
      };
    }
  }, [canvas, updateObjects]);

  const onDragEnd = (result: any) => {
    // if (!result.destination) return;
    const { source, destination } = result;
    const updatedObjects = Array.from(objects);
    const [movedObject] = updatedObjects.splice(source.index, 1);
    updatedObjects.splice(destination.index, 0, movedObject);
    setObjects(updatedObjects);
    updatedObjects.forEach((obj, index) => {
      canvas?.moveObjectTo(obj, updatedObjects.length - 1 - index);
    });

    canvas?.discardActiveObject();
    canvas?.renderAll();
  };

  const handleObjectClick = (obj: any) => {
    setSelectedObject(obj);
    setOpacity(obj.opacity || 1);
    canvas?.setActiveObject(obj);
    canvas?.renderAll();
  };

  const handleOpacityChange = (
    obj: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOpacity = parseFloat(e.target.value);
    setOpacity(newOpacity);
    obj.set("opacity", newOpacity);
    canvas?.renderAll();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleVisibility = (obj: any) => {
    const newVisibility = !visibility[obj.uid];
    setVisibility({ ...visibility, [obj.uid]: newVisibility });
    obj.set("visible", newVisibility);
    canvas?.renderAll();
  };

  const toggleLock = (obj: any) => {
    const newLockStatus = !obj.locked;
    setLockStatus({ ...lockStatus, [obj.uid]: newLockStatus });
    obj.set("locked", newLockStatus);
    obj.set("selectable", !newLockStatus);
    obj.set("evented", !newLockStatus);
    canvas?.discardActiveObject();
    canvas?.renderAll();
  };

  const handleDoubleClick = (obj: any) => {
    setEditingObject(obj);
    setNewName(obj.name || "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNameBlur = () => {
    if (editingObject) {
      editingObject.set("name", newName);
      setEditingObject(null);
      canvas?.renderAll();
    }
  };

  const handleNameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameBlur();
    }
  };

  const handleDelete = async (id: string) => {
    const obj = canvas?.getObjects().find((o: any) => o.uid === id);
    if (obj) {
      const removed = canvas.remove(obj);
      if (removed) {
        canvas?.renderAll();
      }
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
      }}
      className={`border rounded-md w-full`}
    >
      <div className="flex justify-between items-center p-2">
        <h4 className="font-medium text-xl ml-2 font-space">Layers</h4>
      </div>
      {true && (
        <div
          className={` max-h-[55vh] thin-scrollbar overflow-y-auto ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="objects">
              {(provided) => (
                <div
                  className="object-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {objects
                    .filter((obj) => obj.object_type != "crop-rect")
                    .map((obj, index) => (
                      <Draggable
                        key={obj.uid || `object-${index}`}
                        draggableId={obj.uid || `object-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`object-item ${
                              selectedObject === obj ? "selected" : ""
                            }`}
                            onClick={() => handleObjectClick(obj)}
                            onDoubleClick={() => handleDoubleClick(obj)}
                          >
                            <div className="flex gap-2 items-center">
                              <span
                                className="visibility-toggle"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleVisibility(obj);
                                }}
                              >
                                {visibility[obj.uid] ? (
                                  <FaEye size={13} />
                                ) : (
                                  <FaEyeSlash size={13} />
                                )}
                              </span>
                              <span
                                className="lock-toggle mr-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLock(obj);
                                }}
                              >
                                {obj.locked ? (
                                  <FaLock size={13} />
                                ) : (
                                  <FaUnlock size={13} />
                                )}
                              </span>
                              <Image
                                src={obj.toDataURL()}
                                width={50}
                                height={50}
                                style={{
                                  border: "1px solid #ccc",
                                }}
                                className="w-full h-full object-cover rounded-md max-w-[50px] max-h-[50px]"
                                alt=""
                              />
                            </div>
                            <div className="flex items-center">
                              <OpacitySlider
                                opacity={obj.opacity || 1}
                                handleOpacityChange={(e) =>
                                  handleOpacityChange(obj, e)
                                }
                                selectedObject={obj}
                              />
                              <button
                                className="bg-transparent mt-0.5 mr-1.5 pr-0.5 "
                                onClick={() => handleDelete(obj.uid)}
                              >
                                <MdDelete size={20} />
                              </button>
                              <span className="drag-handle">
                                <FaGripVertical size={13} />
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default ObjectsTab;
