import { ChartAreaInteractive } from "@/components/chart-area-interactive";

import { SectionCards } from "@/components/section-cards";

import { adminGetErrolleMent } from "../data/admin/admin-get-errollments";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { admingetRecentCourse } from "../data/admin/admin-get-recent-course";
import { EmptyState } from "@/components/EmptyState";
import { AdminCourseCard, AdminCourseCardSkeleton } from "./courses/_components/AdminCourseCard";
import { Suspense } from "react";

export default async function AdminIndexPage() {
  const errollmentData = await adminGetErrolleMent(); 

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={errollmentData} />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl  font-semibold">Recent Course</h2>
          <Link
            href={"/admin/courses"}
            className={buttonVariants({ variant: "destructive" })}
          >
            View all course
          </Link>
        </div>
        <Suspense fallback={<RenderRecentCourseSkeleton />}>
          <RenderRecentCourse />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourse() {
  const data = await admingetRecentCourse()
  if(data.length === 0){
    return (
      <EmptyState
        title="Create new course"
        description="Create new course"
        actionLabel="Create"
        actionHref="/admin/course/create"
      />
    );
  }
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((course)=>(
          <AdminCourseCard key={course.id} data={course}/>
        ))}
      </div>
    )
}

function RenderRecentCourseSkeleton(){
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}