import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { useState } from "react";

const PopupComponent = () => {
  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);
  return (
    <Popup
      contentStyle={{ padding: 0, width: "60%", borderRadius: "6px 6px 0 0" }}
      open={isOpen}
      modal
      nested
    >
      <div>
        <div
          style={{
            background:
              "linear-gradient(270.11deg, #6B49FC -13.64%, #DE85FF 86.1%, #E26FF1 106.52%)",
            borderRadius: "5.10404px 5.10404px 0px 0px",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "end", padding: "8px" }}
          >
            <a
              className="border cursor-pointer rounded-full bg-white w-8 h-8 text-center justify-center items-center flex font-bold shadow-xl text-2xl"
              onClick={close}
            >
              X
            </a>
          </div>
          <div style={{ paddingBottom: "1rem" }}>
            <p
              style={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: 900,
                fontSize: "21.32px",
                lineHeight: "38px",
                /* identical to box height, or 176% */

                textAlign: "center",
                textTransform: "uppercase",

                color: "#FFFFFF",
              }}
            >
              Self Publishing Titans - MasterClass
            </p>
            <p
              style={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "26px",
                textAlign: "center",
                textTransform: "capitalize",
                color: "#FFFFFF",
              }}
            >
              Your KDP Journey From Dream To Reality
            </p>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
          }}
        >
          <div>
            <div
              style={{
                textAlign: "center",
                marginBottom: "2rem",
                marginTop: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "30px",
                  lineHeight: "62px",
                  marginBottom: "0",

                  color: "#2E2E2E",
                }}
              >
                Limited Time
              </p>
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "52px",
                  lineHeight: "62px",
                  /* identical to box height, or 117% */

                  /* Text/Title */

                  color: "#2E2E2E",
                }}
              >
                Only $97
              </p>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <Link passHref={true} href="/masterclass">
                <div
                  style={{
                    width: "100%",
                    height: "3rem",
                    background:
                      "linear-gradient(270.11deg, #6B49FC -13.64%, #DE85FF 86.1%, #E26FF1 106.52%)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    boxShadow: "0px 0px 12px rgba(75, 2, 145, 0.25)",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignContent: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: 900,
                      fontSize: "20px",
                      lineHeight: "22px",
                      /* identical to box height */

                      textAlign: "center",

                      color: "#FFFFFF",
                    }}
                  >
                    Learn More
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupComponent;
