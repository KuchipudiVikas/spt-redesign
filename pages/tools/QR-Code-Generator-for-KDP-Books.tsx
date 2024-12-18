import { useEffect, useState } from "react";
import Account from "../../lib/mw/Accounts";
import QRCode from "qrcode.react";
import ga from "../../lib/ga";
import { getSession } from "next-auth/react";
import { CloudDownloadIcon } from "lucide-react";
import MainLayout, { getProfile } from "@/components/Layout";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import { GetServerSidePropsContext } from "next";
import { User } from "@/lib/ts/types/user";
import PageTitle from "@/components/Common/PageTitle";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QrCodePageProps {
  info: User;
}

function QrCodePage({ info }: QrCodePageProps) {
  const [value, setValue] = useState("");
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    if (value) {
      ga.event({
        action: "tools_use_qrPageVisit",
        params: {
          what: "QR Code Page Visit",
        },
      });
    }
  }, []);

  return (
    <div>
      {/* {showAuthPopup && <AuthPopupComponent />} */}
      <MainLayout
        meta={{
          title: "QR Code Generator",
          description: "QR Code Generator for KDP Books",
          keywords: "QR Code Generator, KDP Books, Self Publishing Titans",
        }}
        info={info}
        // showSidebar={false}
        // bgGray={false}
        Title={<PageTitle title="QR Code Generator" />}
        Body={
          <div className="min-h-screen  ">
            <div className="flex justify-center">
              <div className="md:m-12  min border light-border sp-container  max-w-screen-lg mx-auto p-4 bg-white  rounded-2xl">
                <div className="flex flex-col">
                  <div className="flex-[2] flex-col">
                    <div
                      style={{
                        minWidth: "500px",
                      }}
                      className="flex  mt-12 gap-5 flex-col"
                    >
                      <Label className="text-label">Enter Website URL</Label>
                      <Textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="mr-14"
                        placeholder="Enter Website URL"
                        style={{
                          resize: "none",
                          background: "white",
                        }}
                        rows={4}
                      />

                      <Button
                        disabled={!value}
                        className="w-full py-6 font-bold mx-auto"
                        onClick={() => {
                          if (!info && value !== "") {
                            setShowAuthPopup(true);
                            return;
                          }
                          const canvas: any =
                            document.getElementById("qrDownload");
                          const pngUrl = canvas
                            .toDataURL("image/png")
                            .replace("image/png", "image/octet-stream");
                          let downloadLink = document.createElement("a");
                          downloadLink.href = pngUrl;
                          downloadLink.download = "Qr Download.png";
                          document.body.appendChild(downloadLink);
                          downloadLink.click();
                          document.body.removeChild(downloadLink);
                          UpdateToolUsage(info._id, "qr_code_generator");
                        }}
                      >
                        Download QR <CloudDownloadIcon />
                      </Button>
                    </div>
                  </div>
                  {value && (
                    <div className="flex-1 border mt-5 rounded-lg p-3 md:min-w-[500px]">
                      <div className="w-fit  h-fit mx-auto">
                        <QRCode
                          id="qrDownload"
                          value={value}
                          size={Math.min(365, window.innerWidth * 0.5)}
                          level={"H"}
                          includeMargin={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);

  if (!session) {
    return {
      props: {
        info: false,
      },
    };
  }

  let info = await Account.getInfo(session.token);

  return {
    props: {
      info: info.full.data,
    },
  };
}

export default QrCodePage;
