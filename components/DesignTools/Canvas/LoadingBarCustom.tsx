import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      <DialogContent>
        <div className="flex flex-col items-center py-5 justify-center">
          <h6 className="">{title}</h6>
        </div>
        <hr />
        <div className="relative w-full  bg-primCol1-400 rounded"></div>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default LoadingBar;
