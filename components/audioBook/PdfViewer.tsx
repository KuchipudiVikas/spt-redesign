import React, { useEffect, useState, useRef } from "react";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import LoadingBar from "../utils/LoadingBar";
import Link from "next/link";
import {
  PlusIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

type Bin = "inc" | "desc";
type Action = Number | Bin;

export const PdfViewer = ({ url, hasAccess, comp }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const scaleFactor = 0.1;
  const [progressCount, setProgressCount] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [start, setStart] = useState(0);
  const [pdfData, setPdfData] = useState(new Uint8Array());
  const totalContentLength = 7588128;
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const previewConfig = {
    pagesAllowed: 10,
  };

  const handlePageChange = (action: Action) => {
    let newPageNumber = pageNumber;
    if (action == "inc" && pageNumber < numPages) {
      newPageNumber = pageNumber + 1;
    }
    if (action == "desc" && pageNumber > 1) {
      newPageNumber = pageNumber - 1;
    }

    setPageNumber(newPageNumber);
    const pageElement = pageRefs.current[newPageNumber - 1];
    if (pageElement && pageElement.current) {
      pageElement.current.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPdfLoaded(true); // Add this line
  }
  const { size } = useCustomDeviceSize();

  const handlePageZoom = (type) => {
    if (type === "add" && scale < 2.5) setScale((prev) => prev + scaleFactor);
    if (type == "remove" && scale > 0.5) setScale((prev) => prev - scaleFactor);
  };

  const pageRefs = useRef([]);

  useEffect(() => {
    pageRefs.current = Array.from(
      { length: numPages },
      (_, i) => pageRefs.current[i] || React.createRef()
    );
  }, [numPages]);
  const containerRef = useRef(null);

  function goToPage(num) {
    if (num > 0 && num <= numPages) {
      setPageNumber(num);
      const pageElement = pageRefs.current[num - 1];
      if (pageElement && pageElement.current) {
        // Scroll the page into view within its scrollable container
        pageElement.current.scrollIntoView({
          block: "nearest",
          inline: "start",
        });
      }
    }
  }

  function updatePageNumber(page) {
    if (page > 9 && !hasAccess) {
      setOpenModal(true);
    }
    setPageNumber(page);
  }

  useEffect(() => {
    if (pdfLoaded) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const pageNumber = Number(
                entry.target.getAttribute("data-page-number")
              );
              updatePageNumber(pageNumber);
            }
          });
        },
        {
          root: null,
          threshold: size == EScreenSize.Mobile ? 0.1 : 0.4,
        }
      );

      pageRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });

      return () => {
        pageRefs.current.forEach((ref) => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        });
      };
    }
  }, [pdfLoaded]);

  const ToolBar = () => {
    return (
      <div className=" flex  flex-col gap-3">
        <div className="flex px-3 items-center justify-center">
          <h6>Zoom</h6>

          <TrashIcon
            color="primary"
            className="cursor-pointer mx-2"
            onClick={() => handlePageZoom("remove")}
          />
          {/* <FormControl variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              value={Math.floor(scale * 100)}
              onChange={(e) => {
                // @ts-ignore
                let scale = Math.round(e.target.value / 100);
                setScale(scale);
              }}
            />
          </FormControl> */}
          <PlusIcon
            color="primary"
            className="cursor-pointer ml-2"
            onClick={() => handlePageZoom("add")}
          />
        </div>
        <div className="flex px-3 items-center">
          <h6>Page</h6>

          <XIcon
            onClick={() => handlePageChange("desc")}
            color="primary"
            className="cursor-pointer mx-2"
          />
          <Input
            type="number"
            className=""
            value={pageNumber}
            onChange={(e) => goToPage(e.target.value)}
          />

          <Input
            onClick={() => handlePageChange("inc")}
            color="primary"
            className="cursor-pointer ml-2"
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchPdf = async () => {
      setLoading(true);
      try {
        const arrayBufferResponse = await fetch(
          `/api/getPdfBuffer?start=${start}`,
          {
            headers: {
              Authorization: `Bearer ${"spt-ccv-sps-212-2018"}`, //
            },
          }
        );
        if (arrayBufferResponse.status === 200) {
          const arrayBuffer = await arrayBufferResponse.arrayBuffer();
          const fetchedData = new Uint8Array(arrayBuffer);
          const newData = new Uint8Array(pdfData.length + fetchedData.length);
          newData.set(pdfData);
          newData.set(fetchedData, pdfData.length);
          setPdfData(newData);
          setStart(newData.length);

          const progressCount = Math.floor(
            (newData.length / totalContentLength) * 100
          );
          setProgressCount(progressCount);

          if (newData.length === totalContentLength) {
            const blob = new Blob([newData], { type: "application/pdf" });
            setLoading(false);
            const blobUrl = URL.createObjectURL(blob);
            setPdfUrl(blobUrl);
          }
        } else if (arrayBufferResponse.status === 202) {
          if (pdfData.length === totalContentLength) {
            setLoading(false);
          }
          setStart(pdfData.length);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch request cancelled");
        } else {
          console.error("Error fetching PDF:", error);
        }
      }
    };

    if (hasAccess) {
      fetchPdf();
    } else {
      setPdfUrl(url);
    }
  }, [start]);

  return (
    <>
      <LoadingBar isLoading={loading} title={`Loading..`} />
      <div className="w-full flex justify-center">
        <div className="flex relative justify-center flex-col  mx-1 md:mx-10 lg:max-w-[1320px]  shadowAround  bg-[#f2f2f2] items-center  ">
          <div className=" lg:flex w-full  items-start br-16 md:mx-2 bg-white   ">
            <div className="w-full md:w-[320px] relative md:m-3 flex justify-center flex-col items-center  br-16 md:px-3">
              <h6
                color={"primary"}
                className="font-Inter flex gap-1 mt-3 sticky mb-5 -top-10 items-center"
              >
                <SettingsIcon color="primary" />
                Controls
              </h6>

              <ToolBar />
            </div>

            <div
              ref={containerRef}
              className="py-5 relative flex lg:block w-[98vw] lg:w-[1320px] overflow-x-scroll br-16 justify-center"
            >
              <div className=" h-[600px] lg:h-[80vh] w-[85vw]  lg:w-[1000px] flex justify-center overflow-scroll pdf-div">
                <Document
                  file={pdfUrl}
                  // onLoadProgress={(progress) => console.log("loading", progress)}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(
                    new Array(
                      hasAccess ? numPages : previewConfig.pagesAllowed
                    ),
                    (el, index) => {
                      if (!pageRefs.current[index]) {
                        pageRefs.current[index] = React.createRef();
                      }

                      return (
                        <div
                          ref={pageRefs.current[index]}
                          key={`page_${index + 1}`}
                          className="pl-32 md:pl-0"
                          data-page-number={index + 1}
                        >
                          <Page
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            scale={scale}
                            pageNumber={index + 1}
                            onRenderSuccess={() =>
                              console.log(`Page ${index + 1} rendered`)
                            }
                          />
                        </div>
                      );
                    }
                  )}
                </Document>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
        <DialogContent>
          <h6 className="font-Inter w-full font-bold my-2">
            Preview Has Ended!{" "}
          </h6>
          <div className="max-h-60 overflow-y-auto">
            <h6 className="font-Inter ">
              Please purchase the book to continue{" "}
            </h6>
            <div className="w-full mt-7 flex justify-center">
              <Link href="/shop/65e302172d647e09bd5ac0d8" className="w-fit">
                <Button>
                  Buy Now <ShoppingCartIcon />
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
