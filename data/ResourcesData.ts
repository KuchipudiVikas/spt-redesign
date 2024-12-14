export type Item = {
  heading: string;
  tag: string;
  link: string;
  newTab?: boolean;
  flair?: string;
};

export type TCategory = {
  Heading?: string;
  Items: Item[];
};

export type TResourcesData = {
  Title: String;
  Categories: TCategory[];
};

const ResourcesData: TResourcesData[] = [
  {
    Title: "Resources",
    Categories: [
      {
        Items: [
          {
            heading: "KDP Masterclass ",
            tag: "A structured and systematic step by step course with 80 videos, lots of resources, and more",
            link: "/masterclass",
          },
        ],
      },
      {
        Items: [
          {
            heading: "Free Resources",
            tag: "Free resources to kick start your KDP journey.",
            newTab: true,
            link: "/free-resources",
          },

          // {
          //   heading: "Community",
          //   tag: "Join our community of like-minded people and ask any and all your questions, share your wins, learn from others.",
          //   newTab: true,
          //   link: "https://community.selfpublishingtitans.com/"
          // }
        ],
      },
      {
        Items: [
          {
            heading: "Support",
            tag: "Get help with any of our tools, request feature updates, report bugs. Tell us everything. We want to hear from you.",
            newTab: true,
            link: "/support",
          },
          // {
          //   heading: "Community",
          //   tag: "Join our community of like-minded people and ask any and all your questions, share your wins, learn from others.",
          //   newTab: true,
          //   link: "https://community.selfpublishingtitans.com/"
          // }
        ],
      },
      {
        Items: [
          // {
          //   heading: "Written Guides",
          //   tag: "Written step by step instructions for every single one of our tools with screenshots.",
          //   link: ""
          // },
          {
            heading: "Blog",
            tag: "Lots of different articles about all sorts of topics. Self-publishing, Amazon KDP, cover design, Amazon Ads, etc.",
            link: "/en/blog",
          },
        ],
      },
      {
        Items: [
          // {
          //   heading: "Video Guides",
          //   tag: "Video step by step instructions for every single one of our tools.",
          //   link: ""
          // },
          {
            heading: "Affiliates",
            tag: "If you are a big fan of our tools, we would love for you to promote our tools with your friends, family and audience.",
            link: "https://affiliates.selfpublishingtitans.com/home",
          },
        ],
      },
      {
        Items: [
          // {
          //   heading: "Video Guides",
          //   tag: "Video step by step instructions for every single one of our tools.",
          //   link: ""
          // },
          {
            heading: "Community",
            tag: "Ask any and all questions and get them answered. We are here to help.",
            link: "https://community.selfpublishingtitans.com",
            newTab: true,
          },
        ],
      },
    ],
  },
];

export default ResourcesData;
