import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface IProgressBar {
  isShowProgressBar: boolean;
  title: string;
  progressCount: number;
}

const ProgressBar = ({
  isShowProgressBar,
  title = "Loading...",
  progressCount,
}: IProgressBar) => {
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);

  useEffect(() => {
    setIsLoadingLocal(true);
  }, []);
  return isLoadingLocal ? (
    <Dialog open={isShowProgressBar}>
      <DialogContent>
        <div className="flex flex-col items-center py-5 justify-center">
          <h1 className="text-4xl">{title}</h1>
        </div>
        <hr />
        <div className="w-full ">
          <Progress value={progressCount} />
        </div>
        <span className="text-2xl p-2">{progressCount}%</span>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default ProgressBar;
