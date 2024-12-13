import React from "react";
import { useState } from "react";
import { User } from "@/lib/ts/types/user";
import profile from "@/lib/api/profile";
import { Button } from "@/components/ui/button";

export interface TPreferences {
  part_of_leaderboard: boolean;
  user_id: string;
}

interface TPreferencesProps {
  preferences: TPreferences;
  info: User;
}

const Preferences: React.FC<TPreferencesProps> = ({ preferences, info }) => {
  const [loading, setLoading] = useState({
    preferences: false,
  });

  const [leaderboardPreferences, setLeaderboardPreferences] =
    useState<TPreferences>(preferences);

  async function UpdatePreferences() {
    try {
      setLoading({ ...loading, preferences: true });
      const { data, error } = await profile.update_leaderboard_preference(
        info._id,
        leaderboardPreferences.part_of_leaderboard
      );
      if (error) {
        console.error("Error updating preferences:", error);
        alert("There was an error while updating preferences");
      } else {
        console.log("Preferences updated successfully:", data);
        alert("Preferences updated successfully");
      }
    } catch (error) {
      console.error("Error in UpdatePreferences:", error);
    } finally {
      setLoading({ ...loading, preferences: false });
    }
  }

  return (
    <div>
      {" "}
      <div className="mt-10 w-full ">
        <div className="w-full bg-white p-6 rounded-2xl">
          <h4 className="font-sans mb-10 text-2xl">Leaderboard Options</h4>
          <div className="mt-4">
            <span className="font-medium text-[16px]">
              Be Part of Leaderboards :{" "}
            </span>
            <select
              value={leaderboardPreferences.part_of_leaderboard ? "yes" : "no"}
              onChange={(e) => {
                setLeaderboardPreferences({
                  ...leaderboardPreferences,
                  part_of_leaderboard: e.target.value == "yes",
                });
              }}
              style={{
                marginLeft: "10px",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
                width: "150px",
              }}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <Button onClick={() => UpdatePreferences()} className="">
            {loading.preferences ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
