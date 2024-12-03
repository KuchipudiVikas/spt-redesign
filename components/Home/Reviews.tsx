import React from "react";
import StarIcon from "../Icons/star";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage } from "../ui/avatar";

const Reviews = () => {
  return (
    <div
      style={{
        marginTop: "50px",
        paddingTop: "50px",
      }}
      className="w-full  flex flex-col font-jsans justify-center  "
    >
      <div
        className="font-jsans mx-auto flex gap-3 font-extrabold"
        style={{
          fontSize: "45px",
        }}
      >
        What our <span className="text-primary"> Authors </span> are Saying
      </div>
      <div className="mt-[72px]">
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-w-[1300px] mx-auto"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="shadow-lg">
                    <CardContent>
                      <ReviewCard />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Reviews;

const ReviewCard: React.FC = ({}) => {
  return (
    <div className="pt-3 ">
      <div className="flex items-center my-3 font-jsans font-semibold text-[18px]">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <div className="ml-2">5/5 Reviews</div>
      </div>
      <div className="">
        <p
          style={{
            lineHeight: "25px",
          }}
        >
          As a self-published author with limited resources, I was struggling to
          make my book visible in such a competitive market. That’s when I found
          these tools, and they have completely transformed my publishing
          journey! The keyword research tool, in particular, is a game-changer.
          It helped me discover terms that readers were actively searching for,
          which I never would have thought of on my own. Within weeks of
          implementing these insights.
        </p>

        <Separator className="mt-4" />
        <div className="mt-4 flex items-center gap-2">
          <Avatar className="w-[55px] h-[55px]">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="w-[55px] h-[55px]"
              alt="Avatar 1"
            />
          </Avatar>
          <div className="flex flex-col">
            <div className="font-semibold text-[18px]">
              Name, Profession{" "}
              <span className="text-[#ccc] text-[14px] font-normal">
                (Location, Country)
              </span>
            </div>
            <div
              style={{
                fontStyle: "italic",
              }}
              className="text-[14px] text-[#333333] "
            >
              Date
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
