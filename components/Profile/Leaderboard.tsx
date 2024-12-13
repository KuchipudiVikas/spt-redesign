import React, { useEffect, useState } from "react";
import usage from "@/lib/api/usage";

import Image from "next/image";
import Trophyicon from "@/public/assets/onboarding/trophy.png";
import { getRequest } from "@/lib/api/interface";
import { User } from "@/lib/ts/types/user";
import { encryptString } from "@/utils/crypto";
import { useRouter } from "next/router";

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

interface LeaderBoardProps {
  user_id: string;
  token: string;
  info: User;
}

interface LeaderBoardEntry {
  total_xp: number;
  user_id: string;
  user_name: string;
  rank: number;
}

export interface UserRank {
  rank: number;
  user_id: string;
  user_name: string;
  total_xp: number;
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ user_id, token, info }) => {
  const [data, setData] = useState<LeaderBoardEntry[] | null>([]);
  const [duration, setDuration] = useState("this month");
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<UserRank | null>(null);

  async function getUserNamesWithId(user_id: string): Promise<User> {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/info/${user_id}`;
    const { data, error } = await getRequest(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (error) {
      console.error(error);
      return;
    }
    // @ts-ignore
    return data.data as User;
  }

  async function getUserNamesOfLeaderBoard(
    data: LeaderBoardEntry[]
  ): Promise<User[]> {
    const promises = data.map((item) => getUserNamesWithId(item.user_id));
    const results = await Promise.all(promises);
    return results;
  }

  const getLeaderBoard = async () => {
    try {
      setLoading(true);
      const { data, error } = await usage.get_leader_board(
        duration.replace(" ", "_") as any
      );

      console.log("leader boar data", data);

      if (error) {
        console.error("Error fetching leaderboard:", error);
      }
      // @ts-ignore
      const userNames = await getUserNamesOfLeaderBoard(data.leaderboard);

      // @ts-ignore
      let leaderboardData = data.leaderboard as LeaderBoardEntry[];
      leaderboardData = leaderboardData.map((entry, index) => {
        return {
          ...entry,
          user_name: userNames.find((user) => user.id == entry.user_id)
            .username,
        };
      });

      console.log("xp leaderboard data is", leaderboardData);

      // @ts-ignore
      setData(leaderboardData);

      const { data: data2, error: error2 } = await usage.get_user_rank(
        duration.replace(" ", "_") as any,
        user_id
      );

      if (error2) {
        return console.error("Error fetching user rank:", error2);
      }

      if (data2) {
        const userRankData = data2 as UserRank;
        setUserRank(userRankData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaderBoard();
  }, [duration]);
  const router = useRouter();

  async function HandleViewProfile(user_id: string) {
    const encryptedUserId = encryptString(user_id);
    router.replace(`/user/${encryptedUserId}`);
  }

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
            src={Trophyicon.src}
            alt=""
            width={50}
            height={50}
            className="my-auto w-[25px] h-auto"
          />{" "}
          XP Leaderboard
        </h6>
        <TimeToggle duration={duration} setDuration={setDuration} />
      </div>

      <hr className="my-4" />
      {loading ? (
        <h6 className="text-center ">Loading...</h6>
      ) : (
        <>
          <div className="px-4 font-jsans rounded-2xl  ">
            <Table style={{}} className="">
              <TableBody>
                {data?.map((entry, index) => (
                  <TableRow
                    key={entry.user_id}
                    style={{
                      backgroundColor:
                        entry.user_id === user_id ? "#e0aaff" : "inherit",
                      borderRadius: "10px",
                    }}
                  >
                    <TableCell
                      style={{
                        padding: "15px 0 ",
                      }}
                      scope="row"
                    >
                      {entry.rank}
                    </TableCell>
                    <TableCell
                      className="cursor-pointer"
                      onClick={() => HandleViewProfile(entry.user_id)}
                    >
                      {entry.user_name || "user"}{" "}
                      {entry.user_id == user_id && " ( You )"}
                    </TableCell>
                    <TableCell align="right">{entry.total_xp}</TableCell>
                  </TableRow>
                ))}
                {userRank &&
                  !data?.some((entry) => entry.user_id === user_id) && (
                    <>
                      <TableRow
                        style={{
                          border: "none",
                        }}
                        className=""
                      >
                        <TableCell colSpan={3} style={{ height: "20px" }} />
                      </TableRow>
                      <TableRow
                        style={{
                          backgroundColor: "#e0aaff",
                          borderRadius: "10px",
                        }}
                      >
                        <TableCell
                          style={{
                            borderTopLeftRadius: "14px",
                            borderBottomLeftRadius: "14px",
                          }}
                          scope="row"
                        >
                          {userRank.rank}
                        </TableCell>
                        <TableCell>{info.username || "user"}</TableCell>
                        <TableCell
                          style={{
                            borderTopRightRadius: "14px",
                            borderBottomRightRadius: "14px",
                          }}
                          align="right"
                        >
                          {userRank.total_xp}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderBoard;

interface TimeToggleProps {
  duration: string;
  setDuration: (duration: string) => void;
}
function TimeToggle({ duration, setDuration }: TimeToggleProps) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const nameProxyIndex = [
    {
      name: "7 Days",
      value: "this week",
    },
    {
      name: "30 Days",
      value: "this month",
    },
    {
      name: "All Time",
      value: "all time",
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
