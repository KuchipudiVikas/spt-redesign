import React, { useEffect, useState } from "react";
import usage from "@/lib/api/usage";

import FireIcon from "@/public/assets/onboarding/fire.png";
import Image from "next/image";
import { StreakRank } from "@/lib/models/profile";
import { User } from "@/lib/ts/types/user";
import { getRequest } from "@/lib/api/interface";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StreakBoardProps {
  user_id: string;
  token: string;
  info: User;
}

interface StreakBoardEntry {
  streak_days: number;
  user_id: string;
  user_name: string;
  rank: number;
}

type TDurationTypes = "current" | "all_time";

const StreakBoard: React.FC<StreakBoardProps> = ({ user_id, token, info }) => {
  const [data, setData] = useState<StreakBoardEntry[] | null>([]);
  const [duration, setDuration] = useState<TDurationTypes>("current");
  const [loading, setLoading] = useState(true);
  const [streakRank, setStreakRank] = useState<StreakRank | null>(null);

  console.log("StreakBoard", user_id, token, info);

  async function getUserNamesWithId(user_id: string): Promise<User | null> {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/info/${user_id}`;
    const { data, error } = await getRequest(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (error) {
      console.error(`Error fetching user with ID ${user_id}:`, error);
      return null;
    }
    // @ts-ignore
    return data.data as TUser;
  }

  async function getUserNamesOfLeaderBoard(
    data: StreakBoardEntry[]
  ): Promise<(User | null)[]> {
    const promises = data.map((item) => getUserNamesWithId(item.user_id));
    const results = await Promise.allSettled(promises);

    return results.map((result) =>
      result.status === "fulfilled" ? result.value : null
    );
  }

  const getStreakBoard = async () => {
    try {
      setLoading(true);
      const { data, error } = await usage.get_streak_leaderboard(
        duration.replace(" ", "_") as any
      );

      if (error) {
        return console.error("Error fetching StreakBoard:", error);
      }

      // merge the user data with the leaderboard data
      const users = await getUserNamesOfLeaderBoard(
        // @ts-ignore
        data.leaderboard as StreakBoardEntry[]
      );

      // @ts-ignore
      let leaderboardData = data.leaderboard as StreakBoardEntry[];
      leaderboardData = leaderboardData.map((entry, index) => {
        const user = users.find((user) => user && user.id === entry.user_id);
        return {
          ...entry,
          user_name: user ? user.username : "Unknown",
        };
      });

      // @ts-ignore
      setData(leaderboardData);

      const { data: data2, error: error2 } = await usage.get_streak_rank(
        user_id
      );
      if (error2) {
        return console.error("Error fetching user rank:", error2);
      }

      if (data2) {
        setStreakRank(data2 as StreakRank);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStreakBoard();
  }, [duration]);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "20px",
      }}
      className="font-jsans"
    >
      <div className="flex justify-between items-center">
        <h6 className="text-xl flex items-center gap-3 font-semibold ">
          <Image
            src={FireIcon.src}
            alt=""
            width={50}
            height={50}
            className="my-auto w-[25px] h-auto"
          />{" "}
          Streak Leaderboard
        </h6>
        <TimeToggle duration={duration} setDuration={setDuration} />
      </div>
      <hr className="my-4" />

      {loading ? (
        <h6 className="text-center mt-4">Loading...</h6>
      ) : (
        <div className="px-4 rounded-2xl  font-sans shadow-none">
          <Table>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow
                  key={entry.user_id}
                  style={{
                    padding: "10px 0 ",
                    backgroundColor:
                      entry.user_id === streakRank?.user_id
                        ? "#e0aaff"
                        : "inherit",
                  }}
                >
                  <TableCell
                    style={{
                      padding: "15px 0 ",
                    }}
                    className=""
                    scope="row"
                  >
                    {entry.rank}
                  </TableCell>
                  <TableCell>
                    {entry.user_name || "user"}{" "}
                    {entry.user_id == user_id && "( You ) "}
                  </TableCell>
                  <TableCell align="right">{entry.streak_days}</TableCell>
                </TableRow>
              ))}
              {streakRank &&
                !data.some((entry) => entry.user_id === streakRank.user_id) && (
                  <>
                    <TableRow>
                      <TableCell colSpan={3} style={{ height: "20px" }} />
                    </TableRow>
                    <TableRow
                      style={{
                        backgroundColor: "#e0aaff",
                      }}
                    >
                      <TableCell
                        style={{
                          borderTopLeftRadius: "14px",
                          borderBottomLeftRadius: "14px",
                        }}
                        scope="row"
                      >
                        {streakRank.rank}
                      </TableCell>
                      <TableCell>{info.username}</TableCell>
                      <TableCell
                        style={{
                          borderTopRightRadius: "14px",
                          borderBottomRightRadius: "14px",
                        }}
                        align="right"
                      >
                        {streakRank.streak_days}
                      </TableCell>
                    </TableRow>
                  </>
                )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StreakBoard;

interface TimeToggleProps {
  duration: string;
  setDuration: (duration: TDurationTypes) => void;
}
function TimeToggle({ duration, setDuration }: TimeToggleProps) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const nameProxyIndex = [
    {
      name: "Current",
      value: "current",
    },
    {
      name: "All Time",
      value: "all_time",
    },
  ];

  return (
    <select
      style={{
        border: "1px solid #ccc",
      }}
      onChange={(e) => setDuration(e.target.value)}
      className="flex gap-4  p-1 w-fit rounded-lg"
    >
      {nameProxyIndex.map((d) => (
        <option
          key={d.value}
          className={`border rounded-lg p-2 ${
            duration === d.value ? "bg-gray-300" : "border-gray-300"
          }`}
          value={d.value}
        >
          {capitalizeFirstLetter(d.name)}
        </option>
      ))}
    </select>
  );
}
