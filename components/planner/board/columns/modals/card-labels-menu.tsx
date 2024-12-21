import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";

type IProps = {
  id: string;
  boardId: string;
};

const cardLabels = [
  {
    type: "performance",
    bg: "#0079bf",
  },
  {
    type: "bug",
    bg: "#eb5a46",
  },
  {
    type: "feature",
    bg: "#61bd4f",
  },
  {
    type: "information",
    bg: "#ff9f1a",
  },
  {
    type: "warning",
    bg: "#f2d600",
  },
];

const CardLabel: FC<IProps> = ({ id, boardId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async (label: { type: string; bg: string }) => {
    const data = {
      _id: id,
      boardId,
      label,
    };

    // await dispatch(updateCard(data));
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="space-y-2">
      <h6 className="text-sm font-semibold text-gray-600">ADD TO CARD</h6>
      <div className="relative">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={toggleMenu}
        >
          Labels
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-md z-10">
            {cardLabels.map((item, index) => (
              <button
                key={index}
                onClick={() => handleClick(item)}
                className="w-full px-2 py-1 text-left text-sm font-medium text-white rounded"
                style={{
                  backgroundColor: item.bg,
                  marginBottom: index === cardLabels.length - 1 ? 0 : "5px",
                }}
              >
                {item.type}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardLabel;
