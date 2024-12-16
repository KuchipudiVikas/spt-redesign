import {
  GraduationCap,
  HandshakeIcon,
  LetterTextIcon,
  MessageSquareIcon,
  ShapesIcon,
  UserIcon,
  UsersIcon,
  YoutubeIcon,
} from "lucide-react";

export type Item = {
  heading: string;
  tag: string;
  link: string;
  newTab?: boolean;
  flair?: string;
  icon: React.ElementType;
};

export type TCategory = {
  Heading?: string;
  Items: Item[];
};

export type TResourcesData = {
  Title: string;
  Categories: TCategory[];
};

const ResourcesData: TResourcesData[] = [
  {
    Title: "Resources",
    Categories: [
      {
        Items: [
          {
            heading: "Free Resources",
            tag: "Kickstart your KDP journey with free resources.",
            newTab: true,
            link: "/free-resources",
            icon: ShapesIcon,
          },
        ],
      },
      {
        Items: [
          {
            heading: "Community",
            tag: "Get your questions answered and learn from others.",
            link: "https://community.selfpublishingtitans.com",
            newTab: true,
            icon: UsersIcon,
          },
        ],
      },
      {
        Items: [
          {
            heading: "KDP Masterclass",
            tag: "Learn KDP with 80 videos and helpful resources.",
            link: "/masterclass",
            icon: GraduationCap,
          },
        ],
      },
      {
        Items: [
          {
            heading: "Tutorials",
            tag: "Video tutorials for using our tools effectively.",
            newTab: true,
            link: "https://www.youtube.com/@SelfPublishingTitans",
            icon: YoutubeIcon,
          },
        ],
      },
      {
        Items: [
          {
            heading: "Blog",
            tag: "Read articles on self-publishing, design, and ads.",
            link: "/en/blog",
            icon: LetterTextIcon,
          },
        ],
      },
      {
        Items: [
          {
            heading: "Affiliates",
            tag: "Promote our tools and earn with your audience.",
            link: "https://affiliates.selfpublishingtitans.com/home",
            icon: HandshakeIcon,
          },
        ],
      },
    ],
  },
];

export default ResourcesData;
