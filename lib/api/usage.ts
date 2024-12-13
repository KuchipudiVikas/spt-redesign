import { duration } from "@mui/material";
import request from "./interface";
import { StreakRank } from "@/models/profile";

type Usage = {
  user_id: string;
  tool_id: string;
};
const base = process.env.NEXT_PUBLIC_TEST_SERVER_URL;

export const UpdateUsage = async (user_id: string, tool_id: string) => {
  const usage: Usage = {
    user_id,
    tool_id,
  };
  const { data, error } = await request.post(base + "/api/usage", usage);
  if (error) {
    console.error("Error updating usage:", error);
  }
  console.log("Usage updated successfully:", data);
};

export const GetTotalPoints = async (user_id: string) => {
  const { data, error } = await request.get(
    base + `/api/usage/xp/total/${user_id}`
  );
  if (error) {
    console.error("Error fetching total points:", error);
  }
  return { data, error };
};

export const GetPerToolPoints = async (user_id: string) => {
  const { data, error } = await request.get(
    base + `/api/usage/xp/per_tool/${user_id}`
  );
  if (error) {
    console.error("Error fetching per tool points:", error);
  }
  return { data, error };
};

type Duration = "today" | "this week" | "this month";

export const GetLeaderBoard = async (duration: Duration) => {
  const { data, error } = await request.get(
    base + "/api/usage/leaderboard/" + duration
  );
  if (error) {
    console.error("Error fetching leaderboard:", error);
  }
  return { data, error };
};

export const GetUserRank = async (duration: Duration, user_id: string) => {
  const url = `${base}/api/usage/leaderboard/${duration}/${user_id}`;
  const { data, error } = await request.get(url);
  if (error) {
    console.error("Error fetching leaderboard:", error);
  }
  return { data, error };
};

export const GetCurrentStreak = async (user_id: string) => {
  const url = `${base}/api/usage/streak/${user_id}`;
  return await request.get(url);
};

export const GetUserActivity = async (user_id: string) => {
  const url = `${base}/api/profile/activity?user_id=` + user_id;
  return await request.get(url);
};

export const GetStreakBoard = async (duration: Duration) => {
  const url = `${base}/api/profile/streak/leaderboard?duration=${duration}`;
  return await request.get(url);
};

export const GetUserStreakRank = async (user_id: string) => {
  const url = `${base}/api/profile/streak/rank?user_id=${user_id}`;
  const { data, error } = await request.get(url);
  return { data: data as StreakRank, error };
};

const usage = {
  get_total_points: GetTotalPoints,
  get_per_tool_points: GetPerToolPoints,
  update_usage: UpdateUsage,
  get_leader_board: GetLeaderBoard,
  get_user_rank: GetUserRank,
  get_current_streak: GetCurrentStreak,
  get_user_activity: GetUserActivity,
  get_streak_leaderboard: GetStreakBoard,
  get_streak_rank: GetUserStreakRank,
};

export default usage;
