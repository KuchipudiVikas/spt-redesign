import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

export function CoursesTab({ courses }) {
  console.log(courses);
  return (
    <div
      style={{}}
      className=" grid grid-cols-1 w-full h-full md:grid-cols-2 gap-2"
    >
      {courses.length > 0 ? (
        courses.map((course, index) => {
          return (
            <div key={index}>
              <div className="flex  sp-container rounded-2xl mx-2 flex-col justify-between mb-4 border gap-4  p-4">
                <h2 className="text-xl font-bold">
                  <Link
                    href={"/masterclass/courses/" + course.feature_shop._id}
                  >
                    {course.feature_shop.Title.slice(0, 18)}
                  </Link>
                </h2>
                <div className="">
                  <Label className="">Progress</Label>
                  <Progress value={course.progress} className="w-full mt-2" />
                </div>

                <div className="flex items-end justify-start mt-3">
                  <Link
                    href={"/masterclass/courses/" + course.feature_shop._id}
                  >
                    <Button variant="outline" className=" cursor-pointer">
                      Access Course <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No Course Enrolled.</p>
      )}
    </div>
  );
}
