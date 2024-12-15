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
import { Testimonial } from "@/lib/ts/interfaces/testimonials";

interface ReviewsProps {
  testimonials: Testimonial[];
}

const Reviews: React.FC<ReviewsProps> = ({ testimonials }) => {
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
            {testimonials.map((Testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/3  lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className=" h-full">
                    <CardContent className="h-full">
                      <ReviewCard testimonial={Testimonial} />
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

interface ReviewCardProps {
  testimonial: Testimonial;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ testimonial }) => {
  return (
    <div className="pt-3 h-full">
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center my-3 font-jsans font-semibold text-[18px]">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <div className="ml-2">5/5 Review</div>
        </div>
        <div className="">
          <p
            style={{
              lineHeight: "25px",
            }}
          >
            {testimonial.message}
          </p>
        </div>
        <div className="">
          <Separator className="mt-4" />
          <div className="mt-4 flex items-center gap-2">
            <Avatar className="w-[55px] h-[55px]">
              <AvatarImage
                src={testimonial.image.url}
                className="w-[55px] h-[55px]"
                alt="Avatar 1"
              />
            </Avatar>
            <div className="flex flex-col">
              <div className="font-semibold text-[18px]">
                {testimonial.name}{" "}
                {/* <span className="text-[#ccc] text-[14px] font-normal">
                (Location, Country) {testimonial.}
              </span> */}
              </div>
              <div
                style={{
                  fontStyle: "italic",
                }}
                className="text-[14px] text-[#333333] "
              >
                {/* {testimonial.} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
