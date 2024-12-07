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
      <DialogContent>
        <div className="flex flex-col items-center py-5 justify-center">
          <h5 className="">{title}</h5>
        </div>
        <hr />
      </DialogContent>
    </Dialog>
  ) : null;
};

export default LoadingBar;
