import React from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

interface AlertProps {
  message: string;
  onClose: () => void;
  type: "success" | "error";
  url?: string;
}

const Alert = ({ message, onClose, type, url }: AlertProps) => {
  return ReactDOM.createPortal(
    <div className={`alert-popup rounded-xl ${type}`}>
      <div className="alert-content">
        <div className="alert-message  text-2xl w-[450px] font-semibold">
          {message}
        </div>
        <div className="flex gap-3 mt-4 pt-2 font-medium justify-center">
          <Button className="font-medium  w-[140px] " onClick={onClose}>
            Close
          </Button>
          {url && (
            <Link href={url} target="_blank" rel="noopener noreferrer">
              <Button className="w-[140px] flex items-center text-[18px]">
                Purchase
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Alert;
