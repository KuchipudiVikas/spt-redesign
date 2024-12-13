import React from "react";
import { useEffect, useState } from "react";
import request from "@/api/interface";
import FacebookIcon from "@/public/assets/social/facebook.png";
import YoutubeIcon from "@/public/assets/social/youtube.png";
import InstagramIcon from "@/public/assets/social/instagram.png";
import TwitterIcon from "@/public/assets/social/twitter.png";
import WebsiteIcon from "@/public/assets/onboarding/internet.png";
import Image from "next/image";
import profile from "@/api/profile";
import { User } from "@/lib/ts/types/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const base = process.env.NEXT_PUBLIC_TEST_SERVER_URL;

type SLink = {
  icon: string;
  label: string;
  link: string;
};

const socialLinks: SLink[] = [
  {
    icon: FacebookIcon.src,
    label: "Facebook",
    link: "",
  },
  {
    icon: YoutubeIcon.src,
    label: "Youtube",
    link: "",
  },
  {
    icon: InstagramIcon.src,
    label: "Instagram",
    link: "",
  },
  {
    icon: TwitterIcon.src,
    label: "Twitter",
    link: "",
  },
  {
    icon: WebsiteIcon.src,
    label: "Website",
    link: "",
  },
];

interface SocialProps {
  info: User;
}

export interface SocialLink {
  domain: string;
  link: string;
}

export interface ApiResponse {
  user_id: string;
  links: SocialLink[];
}

const Social: React.FC<SocialProps> = ({ info }) => {
  const [socialLinksData, setSocialLinksData] = useState<SLink[]>(socialLinks);
  const [loading, setLoading] = useState({ social_links: false });

  async function fetchSocialLinks() {
    try {
      const { data, error } = await profile.get_social_links(info._id);
      if (error) {
        return alert("There was an error while fetching social links");
      }

      if (data) {
        const res: ApiResponse = data as ApiResponse;
        const fetchedLinks: SLink[] = res.links?.map((link: SocialLink) => ({
          icon: getIconForDomain(link.domain),
          link: link.link,
          label: link.domain,
        }));

        const mergedLinks = socialLinks.map((defaultLink) => {
          const fetchedLink = fetchedLinks.find(
            (link) => link.label === defaultLink.label
          );
          return fetchedLink || defaultLink;
        });

        setSocialLinksData(mergedLinks);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...socialLinksData];
    updatedLinks[index].link = value;
    setSocialLinksData(updatedLinks);
  };

  async function SaveSocialLinks() {
    try {
      setLoading({ ...loading, social_links: true });
      const url = `${base}/api/profile/social-links`;
      const links = socialLinksData.map((link: SLink) => {
        return {
          domain: link.label,
          link: link.link,
        };
      });

      const body = {
        user_id: info._id,
        links: links,
      };

      const { data, error } = await request.post(url, body);
      if (error) {
        console.error("Error saving social links:", error);
        alert("There was error in saving social links");
      } else {
        alert("Social links saved successfully");
        console.log("Social links saved successfully:", data);
      }
    } catch (error) {
      console.log("Error in SaveSocialLinks:", error);
    } finally {
      setLoading({ ...loading, social_links: false });
    }
  }

  return (
    <div>
      {" "}
      <div className="mt-10 w-full bg-white p-6 rounded-2xl ">
        <h4 className="font-sans text-2xl">Social Links</h4>
        <div className="w-full">
          {socialLinksData?.map((link: SLink, index: number) => (
            <div key={index} className="flex my-4 gap-3 items-center">
              <Image
                alt=""
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src={link.icon}
                width={100}
                height={100}
              />
              <Input
                type="text"
                value={link.link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
                className="p-3 px-4 w-[320px]"
              />
            </div>
          ))}

          <Button onClick={SaveSocialLinks} className="">
            {loading.social_links ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Social;

export function getIconForDomain(domain: string): string {
  const iconMap: { [key: string]: string } = {
    Facebook: FacebookIcon.src,
    Instagram: InstagramIcon.src,
    Twitter: TwitterIcon.src,
    Youtube: YoutubeIcon.src,
    Website: WebsiteIcon.src,
  };

  return iconMap[domain];
}
