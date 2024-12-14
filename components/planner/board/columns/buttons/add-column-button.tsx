import { PlusIcon } from "@radix-ui/react-icons";
import React, { FC } from "react";

type Props = {
  addColumn: () => void;
  setShowInput: (boolean) => void;
};

const AddColumnButton: FC<Props> = ({ addColumn, setShowInput }) => {
  return (
    <button
      className="bg-transparent flex justify-center items-center gap-3"
      onClick={() => setShowInput(true)}
    >
      Add Column{" "}
      <PlusIcon
        style={{
          fontSize: 13,
        }}
      />
    </button>
  );
};

export default AddColumnButton;
