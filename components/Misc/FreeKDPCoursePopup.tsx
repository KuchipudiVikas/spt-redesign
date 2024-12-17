import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";

interface FreeKDPCoursePopupProps {
  info;
  onChange;
  open;
}

const FreeKDPCoursePopup: React.FC<FreeKDPCoursePopupProps> = ({
  info,
  onChange,
  open,
}) => {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <h1 className="font-semibold text-xl">Amazon KDP Intro Course</h1>
        </DialogHeader>
        <div className=""></div>
      </DialogContent>
    </Dialog>
  );
};

export default FreeKDPCoursePopup;
