// import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from "next/image";
// import { useCustomDeviceSize } from "@/utils/useDeviceSize";
// import Link from "next/link";
// import { Button } from "../ui/button";

// export default function ReviewSection({ testimonials }) {
//   if (testimonials == undefined) {
//     testimonials = [];
//   }

//   try {
//     if (!testimonials.length) {
//       testimonials = [];
//     }
//   } catch (e) {
//     testimonials = [];
//   }
//   const [slides, setSlides] = useState(1);
//   const [slides2, setSlides2] = useState(2);

//   const { size, width } = useCustomDeviceSize();

//   const [my_swiper_1, set_my_swiper_1] = useState<any>({});

//   return (
//     <section
//       style={{
//         background: "#fef6ff",
//         // width: "100vw",
//       }}
//       className=" flex justify-center my-12"
//     >
//       <div className=" mt-5  flex flex-col md:flex-row">
//         <div className="flex flex-col md:p-5 w-full justify-center items-center text-white">
//           <div className="text-white">
//             <h6 className="text-[20px] lg:text-[35px] text-black mt-2  text-center">
//               Trusted by Top Influencers
//             </h6>
//           </div>
//           <div className="mt-8 w-[90vw] flex justify-center  lg:max-w-[1200px]  ">
//             <Swiper
//               modules={[Autoplay, Navigation]}
//               loop={true}
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: true,
//               }}
//               spaceBetween={slides == 1 ? 5 : 8}
//               slidesPerView={width <= 768 ? 1 : width <= 1392 ? 2 : 3}
//               centeredSlides={true}
//               onSwiper={set_my_swiper_1}
//             >
//               {testimonials.map((item, index) => (
//                 <SwiperSlide
//                   key={`testim_${index}`}
//                   className="flex justify-center"
//                 >
//                   <div className="shadowAround p-3 flex flex-col  my-2   w-[80%]   gap-8 border lg:min-h-[300px]  rounded-xl">
//                     <FontAwesomeIcon
//                       height={20}
//                       width={20}
//                       icon="quote-left"
//                       className="text-secCol1-600 text-xl "
//                     />
//                     <h6 className="font-light text-black text-left">
//                       {item.message}
//                     </h6>
//                     <div className="flex mt-auto items-center">
//                       <Image
//                         height={100}
//                         width={100}
//                         className="h-12 w-12 rounded-full object-cover"
//                         src={item.image && item.image.url}
//                         alt={`profile of ${item.name}`}
//                       />
//                       <div className="flex-1 ml-4">
//                         <h6>{item.name}</h6>
//                       </div>
//                       <div className="">
//                         <Link href={item.link ? item.link : ""} target="_blank">
//                           <Button className=" rounded-md  text-sm">
//                             Visit Site
//                           </Button>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

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

interface ReviewsProps {
  testimonials: any;
}

const Reviews: React.FC<ReviewsProps> = ({ testimonials }) => {
  console.log("Testimonials", testimonials);
  return (
    <div
      style={{
        marginTop: "50px",
        // paddingTop: "50px",
        // background: "#fef6ff",
      }}
      className="w-full p-10 rounded-3xl flex flex-col font-jsans justify-center  "
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
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 h-full lg:basis-1/2"
              >
                <div className="p-1 h-full">
                  <Card className="">
                    <CardContent>
                      <ReviewCard
                        name={testimonial.name}
                        message={testimonial.message}
                      />
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

interface Testimonial {
  name: string;
  message: string;
}

const ReviewCard: React.FC<Testimonial> = ({ name, message }) => {
  return (
    <div className="pt-3 h-full">
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
          {message}
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
              {/* Name, Profession{" "} */} {name}
              {/* <span className="text-[#ccc] text-[14px] font-normal">
                (Location, Country)
              </span> */}
            </div>
            {/* <div
              style={{
                fontStyle: "italic",
              }}
              className="text-[14px] text-[#333333] "
            >
              Date
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
