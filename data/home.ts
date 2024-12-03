
export type SelectedTab = "ft" | "et" | "ct" | "rt";


export type Product = {
    title: string;
    features: string[];
    ctaLink: string;
    image: string;
  };

  export type Item = {
    category: string;
    products: Product[];
    type: SelectedTab;
  };

  export const Items: Item[] = [
    {
      category: "Free Publishing Tools ",
      type: "ft",
      products: [
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Pen Name Generator",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Acos Royality Calculator",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "KDP BSR Calculator",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "QR Code Generator",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
      ],
    },
    {
      category: "education Tools",
      type: "et",
      products: [
        {
          title: "KDP Masterclass",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
      ],
    },
    {
      category: "Creative Tools",
      type: "ct",
      products: [
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
      ],
    },
    {
      category: "Research Tools",
      type: "rt",
      products: [
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
        {
          title: "Low content book maker",
          features: [
            "Create low content books",
            "Upload your own designs",
            "Download as PDF",
            "Free to use",
          ],
          ctaLink: "/",
          image: "",
        },
      ],
    },
  ];