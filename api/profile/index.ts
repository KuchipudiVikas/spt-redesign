import request from "../interface";

const base = process.env.NEXT_PUBLIC_TEST_SERVER_URL;

export async function FetchSocialLinks(user_id: string) {
  const slug = base + "/api/profile/social-links?user_id=" + user_id;
  return await request.get(slug);
}

export async function GetProfileInfo(user_id: string) {
  const url = base + "/api/profile";
  return await request.get(url);
}

export async function UpdateLeaderBoardPreference(
  user_id: string,
  enabled: boolean
) {
  const url = base + "/api/profile/preferences";
  return await request.put(url, { user_id, part_of_leaderboard: enabled });
}

export async function GetProfilePreferences(user_id: string) {
  const url = base + "/api/profile/preferences?user_id=" + user_id;
  return await request.get(url);
}

const profile = {
  get_social_links: FetchSocialLinks,
  get_profile_info: GetProfileInfo,
  update_leaderboard_preference: UpdateLeaderBoardPreference,
  get_profile_preferences: GetProfilePreferences,
};

export default profile;
