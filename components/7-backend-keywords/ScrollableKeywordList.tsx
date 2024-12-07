import { Fragment } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { KeywordsTextFieldCardProps } from "@/lib/models/interfaces/7-backend-keywords";
import { CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { PlusCircleIcon } from "lucide-react";

const ScrollableKeywordList = ({
  keywords,
  title,
  addOrRemove,
  optionIndex,
}: KeywordsTextFieldCardProps) => {
  if (keywords.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader title={title}></CardHeader>
        <CardContent>
          <h6>No keywords found</h6>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full p-3">
      {/* <CardHeader
        title={title}
        subheader={"Total: " + keywords.length}
        sx={{
          paddingBottom: "0px",
        }}
      ></CardHeader> */}

      <div className="bg-white">
        <h6 className={`text-black bg-white font-extrabold`}>{title}</h6>
      </div>

      <CardContent className="h-80 p-0  ">
        <Fragment>
          <Separator className="my-3" />
          <InfiniteLoader
            itemCount={keywords.length}
            isItemLoaded={(index) => index < keywords.length}
            loadMoreItems={(startIndex, stopIndex) => {
              console.log("Load more items from", startIndex, "to", stopIndex);
            }}
          >
            {({ onItemsRendered, ref }) => (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    itemCount={keywords.length}
                    itemSize={46}
                    width={width}
                    ref={ref}
                    onItemsRendered={onItemsRendered}
                  >
                    {({ index, style }) => (
                      <Fragment>
                        <div
                          style={{
                            ...style,
                            height: (style.height as number) - 8,
                            padding: "20px 8px",
                            gap: "10px",
                            margin: "20px 2px",
                          }}
                          className="bg-white border-solid border-1 border-gray-400    items-center rounded cursor-pointer hover:bg-gray-100  h-fit w-full  flex gap-2 justify-between"
                          onClick={() => {
                            addOrRemove(
                              keywords[index].keyword,
                              index,
                              optionIndex
                            ); // Pass the keyword to addKeyword function
                          }}
                        >
                          <div className="flex items-center  justify-between gap-2 py-2 w-full">
                            <h6
                              style={{
                                padding: "20px 0",
                              }}
                              className="text-[14px]"
                            >
                              {keywords[index].keyword}
                            </h6>{" "}
                            <div className="p-0 cursor-pointer">
                              {/*<AddCircleOutline />*/}
                              {keywords[index].isSelected ? (
                                <CheckCircle2 className="text-primary" />
                              ) : (
                                <PlusCircleIcon
                                  style={{
                                    color: "#d5c5e4",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </List>
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </Fragment>
      </CardContent>
    </Card>
  );
};

export default ScrollableKeywordList;
