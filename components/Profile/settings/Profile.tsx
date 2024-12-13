import React from "react";
import request from "@/api/interface";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const base2 = process.env.NEXT_PUBLIC_SERVER_URL;

interface ProfileProps {
  token: string;
}

const Profile: React.FC<ProfileProps> = ({ token }) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState({
    profile: false,
  });

  async function GetProfileName() {
    const url = `${base2}/api/account/info`;
    const { data, error } = await request.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (error) {
      console.error("Error fetching profile name:", error);
      alert("There was an error while fetching profile name");
    } else {
      console.log("Profile name fetched successfully:", data);
      // @ts-ignore
      setUserName(data.data.username || "");
    }
  }

  async function SaveProfileName() {
    try {
      setLoading({ ...loading, profile: true });
      const url = `${base2}/api/account/username`;
      const body = {
        username: userName,
      };

      const { data, error } = await request.put(url, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (error) {
        console.error("Error saving profile name:", error);
        alert("There was an error while saving profile name");
      } else {
        console.log("Profile name saved successfully:", data);
        alert("Profile name saved successfully");
      }
    } catch (error) {
    } finally {
      setLoading({ ...loading, profile: false });
    }
  }

  useEffect(() => {
    GetProfileName();
  }, []);

  return (
    <div>
      {" "}
      <div className="mt-10 w-full bg-white p-6 rounded-2xl">
        <h4 className="font-sans text-2xl mb-5">Profile </h4>

        <Label className="font-semibold ">Username</Label>
        <div className=" w-fit min-w-[320px] mt-1 gap-1 flex flex-col">
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              borderRadius: "8px",
            }}
            className="px-3 py-5 "
          />
          <Button
            disabled={loading.profile}
            onClick={() => SaveProfileName()}
            className=" w-fit mt-3  rounded-md text-base"
          >
            {loading.profile ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
