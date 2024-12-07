import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const CartComponent = dynamic(() => import("@/components/RetroVision/chart"), {
  ssr: false,
});

interface GraphProps {
  isShowGraph: boolean;
  setIsShowGraph: (open: boolean) => void;
  graphAsin: string;
  graphDomainSuffix: string;
}

const Graph: React.FC<GraphProps> = ({
  isShowGraph,
  setIsShowGraph,
  graphAsin,
  graphDomainSuffix,
}) => {
  return (
    <Dialog open={isShowGraph} onOpenChange={setIsShowGraph}>
      <DialogContent>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="px-2 py-2"
            >
              <h6 className="text-[20px] font-bold mb-3">
                Titans Tracking Chart
              </h6>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <CartComponent
                asin={graphAsin}
                domainSuffix={graphDomainSuffix}
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
