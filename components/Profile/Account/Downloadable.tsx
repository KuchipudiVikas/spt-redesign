import { Button } from "@/components/ui/button";
import { CloudDownloadIcon } from "lucide-react";
import Link from "next/link";

export default function DownloadableTab({ downloadList }) {
  return (
    <div className="">
      {downloadList.length > 0 ? (
        downloadList.map((ddl, ddlid) => {
          return (
            <div
              key={ddl.id}
              className="flex flex-col sp-container light-border border-2 rounded-2xl mb-4 border  p-2 "
            >
              <div className="flex flex-col items-center md:flex-row">
                {/* <div className="flex-1 flex justify-center items-center">
                  <Image
                    src={ddl.product.image[0].url}
                    alt={ddl.product.title}
                    width={200}
                    height={200}
                  />
                </div> */}
                <div className="flex-1  md:p-4">
                  <p>
                    From: <b>{ddl.product.title}</b>
                  </p>
                  <h4
                    style={{
                      wordBreak: "break-all", // Breaks long words at any character
                      maxWidth: "100%", // Ensures the container doesn't exceed its parent width
                    }}
                    className="text-xl font-bold"
                  >
                    {ddl.data.name}
                  </h4>
                  <div
                    className="text-sm h-20 overflow-y-auto"
                    dangerouslySetInnerHTML={{
                      __html: ddl.product.details,
                    }}
                  />
                </div>
                <Link href={`/download/${ddl.id}`}>
                  <Button
                    variant="outline"
                    className="btn btn-primary h-fit my-auto"
                  >
                    Download <CloudDownloadIcon />
                  </Button>
                </Link>

                {/* <div className="">
                  <Link
                    passHref
                    href="/download/[id]"
                    as={`/download/${ddl.id}`}
                    className="btn btn-primary"
                  >
                    Download
                  </Link>
                </div> */}
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ minHeight: "300px" }}>
          <p>No Files Purchased yet from shop</p>
        </div>
      )}
    </div>
  );
}
