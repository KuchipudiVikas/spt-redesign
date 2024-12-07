import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { TrashIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";

interface GraphProps {
  isShowGraph: boolean;
  setIsShowGraph: (open: boolean) => void;
  graphAsin: string;
  graphKeywordData: any;
}

const Graph: React.FC<GraphProps> = ({
  isShowGraph,
  setIsShowGraph,
  graphAsin,
  graphKeywordData,
}) => {
  const CartComponent = dynamic(
    () => import("@/components/Keyword-tool/chart"),
    {
      ssr: false,
    }
  );
  return (
    <Dialog open={isShowGraph} onOpenChange={setIsShowGraph}>
      <DialogContent className="w-[700px] max-w-[100vw]">
        <div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "600px",
              }}
              className=""
            >
              <h6 className="text-[20px] font-bold mb-3">
                Keywords Ranking Graph
              </h6>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <CartComponent
                asin={graphAsin}
                trackingData={JSON.parse(JSON.stringify(graphKeywordData))}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Graph;
