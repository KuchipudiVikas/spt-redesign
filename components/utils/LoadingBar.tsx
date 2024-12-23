import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
interface ILoadingBar {
  isLoading: boolean;
  title: string;
}

const LoadingBar = ({ isLoading, title = "Loading..." }: ILoadingBar) => {
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);

  useEffect(() => {
    setIsLoadingLocal(true);
  }, []);
  return isLoadingLocal ? (
    <Dialog open={isLoading}>
      <DialogContent showClose={false}>
        <div className="flex flex-col items-center py-5 justify-center">
          <h5 className="text-[20px] font-medium">{title}</h5>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-value"></div>
        </div>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default LoadingBar;
