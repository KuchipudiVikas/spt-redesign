import React, { useState } from "react";
import Image from "next/image";
import QuestionIcon from "@/public/assets/onboarding/question.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const HowToModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div
        style={{
          border: "1px solid #ccc",
        }}
        onClick={handleClickOpen}
        className="flex gap-3 p-3 py-4 h-fit rounded-2xl bg-white cursor-pointer  items-center"
      >
        <Image
          src={QuestionIcon.src}
          alt=""
          width={50}
          height={50}
          className="my-auto w-[30px] h-auto"
        />{" "}
        <div className="flex flex-col">
          <div className="text-[15px] font-bold">How it works? </div>
          <div className="text-[11px] text-gray-500">What is this ?</div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className="font-jsans font-bold">
            How it works?
          </DialogTitle>
          {/* @ts-ignore */}
          <div style={styles.content} className="">
            <div className="">
              <h3>1. Streak </h3>
              <p className="mt-3">
                <strong>What It Means:</strong> A streak is when you do
                something for a number of days in a row. It helps keep you
                motivated to keep going. Example: If you log in and use our
                website for 7 days straight, you have a 7-day streak.
                Leaderboard: We have a streak leaderboard where you can see the
                users that have the longest streak.{" "}
              </p>
              <p className="mt-3">
                <strong>Example: </strong> If you log in and use our website for
                7 days straight, you have a 7-day streak.
                <strong> Leaderboard: </strong> We have a streak leaderboard
                where you can see the users that have the longest streak.{" "}
              </p>
              <p className="mt-3">
                <strong> Leaderboard: </strong> We have a streak leaderboard
                where you can see the users that have the longest streak.{" "}
              </p>
            </div>
            <div className="mt-6">
              <h3>2. XP (Experience Points)</h3>
              <p className="mt-3">
                <strong>What It Means:</strong> XP stands for experience points.
                You earn XP by using our tools. The more XP you get, the higher
                your level.
              </p>
              <p className="mt-3">
                <strong>Example: </strong>&quot;For every tool you use, you earn
                XP each use. Collecting XP helps you move up to higher levels
                and soon also leagues.
              </p>
              <p className="mt-3">
                <strong> XP Points Breakdown: </strong>{" "}
                <div> Creation Tools: 10 Points per use </div>{" "}
                <div> Research Tools: 5 Points per use </div>{" "}
                <div> Book Listing Tools: 5 Points per use </div>{" "}
                <div> General Tools: 2 Points per use </div>{" "}
                <div>
                  {" "}
                  Community: 2 Points per question 5 Points per answer{" "}
                </div>{" "}
              </p>
              <p className="mt-3">
                <strong> Levels: </strong> Your level is based on your XP. The
                more XP you accumulate, the higher your level. Here are the XP
                points needed to level up:
              </p>
              {/* @ts-ignore */}
              <table style={styles.table}>
                <thead>
                  <tr>
                    {/* @ts-ignore */}
                    <th style={styles.th}>Level</th>
                    {/* @ts-ignore */}

                    <th style={styles.th}>XP Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>10</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>100,000</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>9</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>50,000</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>8</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>10,000</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>7</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>5,000</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>6</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>3,000</td>
                  </tr>
                  <tr>
                    {" "}
                    {/* @ts-ignore */}
                    <td style={styles.td}>5</td>
                    {/* @ts-ignore */}
                    <td style={styles.td}>1,500</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>4</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>500</td>
                  </tr>{" "}
                  <tr>
                    {/* @ts-ignore */}
                    <td style={styles.td}>3</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>150</td>
                  </tr>
                  <tr>
                    {" "}
                    {/* @ts-ignore */}
                    <td style={styles.td}>2</td>
                    {/* @ts-ignore */}
                    <td style={styles.td}>50</td>
                  </tr>
                  <tr>
                    {" "}
                    {/* @ts-ignore */}
                    <td style={styles.td}>1</td>
                    {/* @ts-ignore */}
                    <td style={styles.td}>10</td>
                  </tr>
                  <tr>
                    {" "}
                    {/* @ts-ignore */}
                    <td style={styles.td}>0</td>
                    {/* @ts-ignore */}
                    <td style={styles.td}>0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3>3. Skill Level</h3>

              <p className="mt-3">
                <strong>What It Means: </strong>
                Your skill level shows how much experience you have overall with
                our tools and self-publishing. With every single tool that we
                have on our website you will have a skill level. The more you
                use it, the higher your skill level is.
              </p>
              <p className="mt-3">
                <strong>Example: </strong> If your skill level with our keyword
                research tool is level 5, and your skill level with our cover
                design tool is level 5, and your skill level with our 7 backend
                keywords tool is 5, then your skill level will be 15. (so it
                totals your level for each tool together as the combined total
                skill level).
              </p>
              <p className="mt-3">
                <strong>Skill levels: </strong> Your level is based on your XP.
                The more XP you accumulate, the higher your level. Here are the
                XP points needed to level up:
              </p>
              {/* @ts-ignore */}
              <table style={styles.table}>
                <thead>
                  <tr>
                    {/* @ts-ignore */}
                    <th style={styles.th}>Level</th>
                    {/* @ts-ignore */}

                    <th style={styles.th}>XP Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>10</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>100,000</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>9</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>50,000</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>8</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>10,000</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>7</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>5,000</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>6</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>3,000</td>
                  </tr>
                  <tr>
                    {" "}
                    {/* @ts-ignore */}
                    <td style={styles.td}>5</td>
                    {/* @ts-ignore */}
                    <td style={styles.td}>1,500</td>
                  </tr>
                  <tr>
                    {/* @ts-ignore */}

                    <td style={styles.td}>4</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>500</td>
                  </tr>{" "}
                  <tr>
                    {/* @ts-ignore */}
                    <td style={styles.td}>3</td>
                    {/* @ts-ignore */}

                    <td style={styles.td}>150</td>
                  </tr>
                  <tr>
                    {" "}
                    {/* @ts-ignore */}
                    <td style={styles.td}>2</td>
                    {/* @ts-ignore */}
                    <td style={styles.td}>50</td>
                  </tr>
                  <tr>
                    {" "}
                    {/* @ts-ignore */}
                    <td style={styles.td}>1</td>
                    {/* @ts-ignore */}
                    <td style={styles.td}>10</td>
                  </tr>
                  <tr>
                    {" "}
                    {/* @ts-ignore */}
                    <td style={styles.td}>0</td>
                    {/* @ts-ignore */}
                    <td style={styles.td}>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const styles = {
  content: {
    padding: "20px",
    fontSize: "16px",
    maxHeight: "60vh",
    overflowY: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    padding: "10px",
    marginTop: "13px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default HowToModal;
