import React from "react";
import {
  ArrowRight,
  ChevronRight,
  CopyIcon,
  DollarSignIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import Solutions from "./Solutions";
import Resources from "./Resources";
import LinkIndex from "@/lib/linkIndex";
import Account from "./Account";
import { Separator } from "@/components/ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { User } from "@/lib/ts/types/user";
import Create from "./Create";
import ChromeExtension from "./ChromeExtension";
import Help from "./Help";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Search from "./search";
import BrandLogo from "@/public/favIcon.png";
import Image from "next/image";
import Notifications from "./Notifications";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface MobileMenuProps {
  logout: () => void;
  info: User | false;
  token: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ logout, info, token }) => {
  const affiliateData = useSelector(
    (state: RootState) => state.affiliate.affiliateData
  );

  return (
    <div className="w-full flex gap-2 items-center justify-between">
      <Link href={"/"}>
        <Image
          src={BrandLogo}
          alt="logo"
          className="mr-2"
          width={40}
          height={40}
        />
      </Link>
      <Search />
      <div className="flex gap-3 items-center">
        <Notifications token={token} info={info} />
        <Drawer direction="right">
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent className="p-5 sp-container py-4">
            {info && (
              <>
                <div className="flex justify-between items-center">
                  <Account isMobile info={info} logout={logout} />
                </div>
                <Separator className="my-5" />
              </>
            )}

            <div className="max-h-[86vh] overflow-y-auto">
              <div className="flex bg-white border light-border p-5 rounded-2xl flex-col gap-4">
                <Solutions isMobile />
                <Resources isMobile />
                <Link
                  className="font-semibold flex w-full justify-between items-center"
                  href={LinkIndex.PRICING}
                >
                  Pricing <ChevronRight className="w-4 text-gray-500" />
                </Link>
                <Link
                  className="font-semibold flex w-full justify-between items-center"
                  href={LinkIndex.TESTIMONIALS}
                >
                  Testimonials <ChevronRight className="w-4 text-gray-500" />
                </Link>
              </div>

              {/* <Separator className="my-5" /> */}

              {!info ? (
                <div className="flex gap-1 mt-6">
                  <Link
                    href={LinkIndex.LOGIN}
                    className="font-semibold px-3 w-full flex justify-between"
                  >
                    <Button size="lg" className="w-full">
                      Login <ArrowRight className="w-4 " />
                    </Button>
                  </Link>
                  <Link
                    href={LinkIndex.REGISTER}
                    className="font-semibold w-full  flex justify-between"
                  >
                    <Button size="lg" variant="outline" className="w-full">
                      Get Started <ChevronRight className="w-4 " />
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="bg-white mt-4 border light-border p-5 rounded-2xl">
                    <Create isMobile />
                    <ChromeExtension isMobile />
                    <Help isMobile />
                  </div>

                  <div className="mt-4">
                    <div className="bg-white border light-border p-5 rounded-2xl">
                      <Link
                        href={LinkIndex.MY_ACCOUNT}
                        className="font-semibold px-3 flex justify-between"
                      >
                        My Account{" "}
                        <ChevronRight className="w-4 text-gray-500" />
                      </Link>
                      <Link
                        href={LinkIndex.PROFILE}
                        className="font-semibold px-3 mt-4 flex justify-between"
                      >
                        Profile <ChevronRight className="w-4 text-gray-500" />
                      </Link>

                      <div className="flex-col gap-3 sp-container mt-3 rounded-2xl flex justify-start p-3 text-black text-gray-500 font-sans">
                        <h6 className="text-black text-gray-500">
                          Your Affiliate Dashboard
                        </h6>

                        <Link
                          href={"/user/affiliate"}
                          className="flex gap-4 items-center"
                        >
                          <DollarSignIcon
                            className=""
                            style={{ fontSize: "16px" }}
                          />
                          <span className="text-black text-gray-500 text-[15px]">
                            Affiliate Program
                          </span>
                        </Link>

                        {affiliateData && (
                          <Button
                            variant="ghost"
                            className="flex gap-4 justify-start items-center p-0 m-0"
                            onClick={() => {
                              window.navigator.clipboard.writeText(
                                `https://affiliates.selfpublishingtitans.com/${affiliateData.affiliate_id}.html`
                              );
                            }}
                          >
                            <CopyIcon
                              className=""
                              style={{ fontSize: "16px" }}
                            />
                            <span className="text-black text-gray-500 text-[15px] font-normal">
                              Copy My Link
                            </span>
                          </Button>
                        )}

                        {affiliateData && (
                          <Link
                            href={`https://affiliates.selfpublishingtitans.com/${affiliateData.affiliate_id}.html`}
                            className="flex gap-4 items-center"
                          >
                            {/* <ContentCopyIcon className="" style={{ fontSize: "16px" }} /> */}
                            <h6
                              style={{
                                fontSize: "12px",
                                color: "#5d5d5d",
                                textWrap: "wrap",
                                maxWidth: "200px",
                              }}
                              className=""
                            >
                              https://affiliates.selfpublishingtitans.com/
                              {affiliateData.affiliate_id}.html
                            </h6>
                          </Link>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="  w-full mt-4"
                      size="lg"
                    >
                      Logout
                      <LogOut className="w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default MobileMenu;
