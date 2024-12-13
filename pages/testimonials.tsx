import React from "react";
import MainLayout from "@/components/Layout";

import PaddyImage from "@/public/images/testimonials/3.png";
import JuliaImage from "@/public/images/testimonials/4.png";
import BenImage from "@/public/images/testimonials/5.png";
import RachelImage from "@/public/images/testimonials/6.png";
import BenJamesImage from "@/public/images/testimonials/7.png";
import RebeccaImage from "@/public/images/testimonials/8.png";
import SteveImage from "@/public/images/testimonials/9.png";
import PamImage from "@/public/images/testimonials/10.png";
import ChrisImage from "@/public/images/testimonials/11.png";
import LorenzoImage from "@/public/images/testimonials/1.png";
import NuriaImage from "@/public/images/testimonials/2.png";
import BrandIcon from "@/public/favIcon.png";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Testimonials = () => {
  return (
    <MainLayout
      info={false}
      meta={{
        title: "Testimonials | Self Publishing Titans",
        description: "Testimonials",
        keywords: "Testimonials ",
      }}
      Title={
        <div className="flex my-10 justify-center flex-col items-center">
          <h1 className="text-[60px]  mt-[20px] font-jsans flex justify-center items-center gap-3 mx-auto  font-extrabold text-center text-gray-900 ">
            Our Testimonials
          </h1>
          <ScrollDownButtonSpecial />
        </div>
      }
      Body={
        <div
          style={{
            paddingTop: "60px",
          }}
          className="w-full comp-container"
        >
          <h2
            style={{
              fontSize: "45px",
              width: "80%",
            }}
            className="mx-auto text-center  font-jsans font-extrabold"
          >
            Over <span className="text-primary"> 130,000 </span> Authors have
            chosen Self Publishing Titans
          </h2>
          <div className="pt-8 w-full">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                index={index}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Testimonials;

interface ITestimonialCardProps {
  testimonial: TTestimonial;
  index: number;
}

const TestimonialCard: React.FC<ITestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  const flexDirection = index % 2 == 0 ? "flex-row" : "flex-row";
  const BgColor = index % 2 == 0 ? "#f4f0f7" : "#f7f6f8";
  return (
    <div className="my-6 flex justify-center w-[1300px] ">
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "30px",
          gap: "20px",
          backgroundColor: BgColor,
        }}
        className={`grid grid-cols-4  w-full p-10  ${flexDirection}  items-center  gap-6 -mx-4`}
      >
        <div style={{}} className="flex items-center flex-col gap-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ff6b00"
            >
              <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ff6b00"
            >
              <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ff6b00"
            >
              <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ff6b00"
            >
              <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ff6b00"
            >
              <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
            </svg>

            <span className="mt-1 font-bold ml-2">5.0</span>
          </div>{" "}
          <h6
            style={{
              fontSize: "24px",
            }}
            className="text-center font-bold"
          >
            {testimonial.name}
          </h6>
          <Image
            src={testimonial.imageSrc}
            width={280}
            height={280}
            alt={testimonial.altText}
            style={{}}
            className="w-[]"
            // style={{
            //   borderRadius: "50%"
            // }}
          />
        </div>
        <div
          className={`flex bg-white col-span-3 rounded-lg p-5 h-full flex-col gap-2 ${"text-center"} justify-start items-center`}
        >
          {testimonial.testimonial.map((text, index) => (
            <p key={index} className={"py-1.5 "}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

type TTestimonial = {
  name: string;
  imageSrc: string;
  altText: string;
  backgroundColor: string;
  testimonial: string[];
};

const testimonials: TTestimonial[] = [
  {
    name: "Lorenzo Self Publish",
    imageSrc: LorenzoImage.src,
    altText: "Lorenzo Self Publish",
    backgroundColor: "#f7f6f8",
    testimonial: [
      "Self Publishing Titans have “must have” tools.",
      "For my keyword research, Titans Pro is the essential software. In one app, everything needed to find market niches on Amazon and correctly validate their profitability is included. Specifically, the recent update that adds the historical book performance chart is extremely useful for understanding trends, which are essential for anyone doing self-publishing.",
      "All of my puzzles are created using the Puzzle Tool Creation from Self Publishing Titans. It is by far the easiest and most intuitive software to use for creating activity pages, and I’ve tried many. Additionally, the level of freedom and customization is truly incredible. Everyone publishing puzzle books should use it.",
      "Since the release of the 7 Keyword Tool from Self Publishing Titans, my way of managing the 7 Backend Keywords has completely changed. I used to spend a lot of time on Amazon trying to find the right keywords to include. Now, the right keywords are already selected, and it’s just a matter of choosing them... this has saved me a lot of precious time.",
    ],
  },
  {
    name: "Nuria Corbi Carrasco - The Home Boss",
    imageSrc: NuriaImage.src,
    altText: "Nuria Corbi Carrasco - The Home Boss",
    backgroundColor: "#f7f6f8",
    testimonial: [
      "All the research tools have helped me a lot, especially the Titans Quick View, Retro and Deep View. And the free tools have also been really helpful.",
      "I found a great niche using Titans Pro, I probably wouldn't have known about this without these tools.",
      "I love that you can find all the tools that you need in one place, and I also love how intuitive and userfriendly they are. Big thumbs up from me!",
    ],
  },
  {
    name: "Chris Raydog",
    imageSrc: ChrisImage.src,
    altText: "Chris Raydog",
    backgroundColor: "#f7f6f8",
    testimonial: [
      `After knowing Corvin for a number of years now, I truly believe his knowledge and integrity sets him apart from the rest in the publishing space. I've taken & recommended his course to my audience as I completely trust his approaches to publishing successful books on Amazon, and jumped at the chance to write this foreword to sing his praises. 
I’ve also had the pleasure of many one-on-one conversations with Corvin, and as someone who has been publishing for over 10 years, I still find myself learning new tips and tricks from him that have helped me refine my own approach to self-publishing. `,
      `Needless to say, Corvin continues to stretch the envelope with his research tools, software, and knowledge, paving the way for new publishers to massively increase the exposure and quality of their publications.
`,
    ],
  },

  {
    name: "Julia Robinette",
    imageSrc: JuliaImage.src,
    altText: "Julia Robinette",
    backgroundColor: "#f7f6f8",
    testimonial: [
      `I think Titans Pro is a great tool to help people get a better understanding of the prospects of certain niches. It helps me quickly nix ideas on niches by looking at the Demand, Opportunity, Niche Score, and other attributes within the tool sets and focus on niching down more on ones that look promising.
`,
      `The puzzle tools are great! I really like that they are integrated with your website. Having the web interface makes it easier for me as I don't have to remember to do updates or anything like that. Additionally - there are so many activities and puzzle options! I still haven't gotten around to every single type of puzzle that is offered even though I have both Puzzle Tools`,
      `I would definitely recommend using the Self Publishing Titans tools. In fact I purposely signed up to be an affiliate because I strongly feel that Corvin and his team really care about their customers and the quality of their products. I 100% want to support "small businesses" like the Self Publishing Titans.`,
    ],
  },
  {
    name: "Ben McQueeney",
    imageSrc: BenImage.src,
    altText: "Ben McQueeney",
    backgroundColor: "#f7f6f8",
    testimonial: [
      `Self-Publishing Titans makes DIY publishing a breeze, offering everything from effective keyword research tools to easy-to-use, web-based book design programs. With a range of free resources available on the Self-Publishing Titans website, anyone in the world can start their self-publishing journey effortlessly. `,
    ],
  },
  {
    name: "Rachel Harrison-Sund",
    imageSrc: RachelImage.src,
    altText: "Rachel Harrison-Sund",
    backgroundColor: "#f7f6f8",
    testimonial: [
      `Conduction manual niche research on Amazon is a huge time suck, but the Self-Publishing Titans Chrome Extensions dramatically reduce the time it takes to conduct solid research, while also providing valuable market insights.`,
    ],
  },
  {
    name: "Ben James - Money On The Side",
    imageSrc: BenJamesImage.src,
    altText: "Ben James - Money On The Side",
    backgroundColor: "#f7f6f8",
    testimonial: [
      `“I have been a member of the Self Publishing Titans Facebook group for years, and have always found it to be a welcoming and helpful community. 
`,
      `Over the last year, myself and Corvin have had regular brainstorms about how we can better serve & provide value to our self-publishing audiences. `,
      `Corvin’s self-publishing Masterclass is one example of how he provides immeasurable value to his audience, this book is another!”
`,
    ],
  },
  {
    name: "Rebecca Holman - Low Content Book Mastery",
    imageSrc: RebeccaImage.src,
    altText: "Rebecca Holman - Low Content Book Mastery",
    backgroundColor: "#f7f6f8",
    testimonial: [
      `Learn from the best and you can't go wrong.
Amazon is the biggest book store on the planet at this time and understanding the ins and outs of how Amazon KDP works is certainly a topic that many thousands of people have spent an abundance of time trying to understand and decipher. 
For me it is very important to listen to people who are successful in this work and Corvin and Cleo have proven they know their stuff`,
      `Corvin has proven time and again to be a valuable mentor, teacher and coach in the KDP space with his course and many tools. His sales numbers show he knows what he is speaking about, making his words even more important and valuable to any that wish to succeed in this business. `,
      `I have watched Corvin from the first day he appeared on the KDP scene and he has become an invaluable and trusted resource for thousands who have been seeking to succeed at KDP, especially in the Low Content and Mid Content side of Amazon KDP. `,
      `I don't think there is anyone else, right now, that has given more to this community. When you consider all the tools that Corvin has created, which are based upon his successful business model, you can feel his deep desire to see others succeed. That is the mark of a true mentor. `,
      `I was once the teacher, and now I can say that Corvin is my teacher and mentor, and I watch and apply what he is teaching to my business. To all who read this, I wish you all success, by following the best. `,
    ],
  },
  {
    name: "Steven Myers - KDP Veteran / Coach",
    imageSrc: SteveImage.src,
    altText: "Steven Myers - KDP Veteran / Coach",
    backgroundColor: "#f7f6f8",
    testimonial: [
      `While I was early into my KDP journey, I was seeking a group of like-minded people that would be helpful, share insight and guide each other along. I came across a research tool for niches on KDP, maybe through a video I saw or something and discovered there was a group by the creator. I found the group and I joined. I could tell the creator, Corvin Van Stone, was very helpful and eventually could tell he was also sincere. The sincerity was more clear, given the amount of information, assistance and even tools he was giving away for free. I became a regular contributor and eventually, based on my demonstrated knowledge and helpfulness, was asked to help with the group in an administrator capacity. `,
      `Corvin and I became friends along the way, as well as having met in person, spending a day in New York City with his wife, Cleo, who also does a lot of work behind the scenes. They have sold well over 100,000 books and truly are making KDP work. Together, these two have taken their vast experience and created a number of helpful tools, as well as offering a Masterclass course, complete with individual videos on each topic. They are transparent, honest and realistic about everything they present with no false promises.`,
      `In this book, you are essentially getting a smaller version of the course, but still a very simple guide, complete with screen shots where needed, to provide you with "A to Z" basic details on how to get started. The book is written in a very personal style, as if Corvin is speaking to you directly in a classroom environment. The book does a masterful job of providing the very basic details of KDP set up, to the key concepts and steps to take to guide you on a successful path in KDP.`,
      `I would recommend this book for anyone that would like a direct, but easy to read guide on getting started with KDP, as well as information on how to conduct research, while providing direction on where to get all the rest of the valuable tools and information. `,
    ],
  },
  {
    name: "Pam Moore",
    imageSrc: PamImage.src,
    altText: "Pam Moore",
    backgroundColor: "#f7f6f8",
    testimonial: [
      `For me personally, the best thing about Titans Pro is Corvin. Simply the fact that every time I’ve ever messaged him and asked him a question (and I asked him really stupid questions). He’s always kind and helpful to me. He never makes me feel stupid and I appreciate him more than anyone else, I’ve talk to on the Internet.`,
      `My favorite is the retro tool. I just got it and I love it!
`,
      `Your masterclass helped me the most. It just suddenly clicked in my head when Corvin said, only write the keyword from the drop-down. I had been guessing and writing what I thought people were looking for not what was actually written down for me. I felt really stupid, but I was so grateful!
`,
    ],
  },

  {
    name: "Paddy - Stackin Profit",
    imageSrc: PaddyImage.src,
    altText: "Paddy - Stackin Profit",
    backgroundColor: "#f7f6f8",
    testimonial: [
      "  Your tools just really speed up the process of research for me. Overall amazing and keep up the good work.",
    ],
  },
];

function ScrollDownButtonSpecial() {
  return (
    <div
      style={{
        paddingLeft: "6px",
        paddingRight: "16px",
        paddingTop: "6px",
        paddingBottom: "6px",
        boxShadow: "0px 0px 2px 2px #fff, inset 0px 0px 18px 4px #fff",
      }}
      className="font-normal mt-[30px] mb-5 bg-transparent w-fit flex text-[14px] gap-2 items-center rounded-full"
    >
      BY :
      <Image src={BrandIcon.src} alt="Brand Icon" width={30} height={30} />
      Self Publishing Titans
    </div>
  );
}
