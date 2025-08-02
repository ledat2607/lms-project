import { getAllCourses } from "@/app/data/course/get-all-courses";
import { PublicCourseCard, PublicCourseCardSkeleton } from "../_components/PublicCourseCard";
import { Suspense } from "react";

export default function PublicCoursePage() {
  return (
    <div className="mt-5">
      <div className="flex flex-col space-y-2 mb-10 text-center">
        <h1 className="text-3xl  md:text-4xl font-bold tracking-tighter">
          Explore course
        </h1>
        <p className="text-muted-foreground">
          Discovery our wide range of courses designed to help you achieve your
          learning goals
        </p>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
}



async function RenderCourses(){
  const courses = await getAllCourses();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <PublicCourseCard data={course} key={course.id} />
      ))}
    </div>
  );
}

function LoadingSkeleton(){
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}