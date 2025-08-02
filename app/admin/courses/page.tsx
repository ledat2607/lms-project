import { adminGetCourses } from "@/app/data/admin/get-admin-course";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { AdminCourseCard, AdminCourseCardSkeleton } from "./_components/AdminCourseCard";
import { Suspense } from "react";

export default async function CoursesPage() {
  return (
    <>
      <Suspense fallback={<AdminCoursePageSkeleton />}>
        <RenderCourse />
      </Suspense>
    </>
  );
}

async function RenderCourse() {
  const data = await adminGetCourses();

  const isEmpty = data.length === 0;
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold uppercase">Your course</h1>
        <Link
          href={"/admin/courses/create"}
          className={`${isEmpty ? "hidden" : "block"}`}
        >
          <Button>
            <PlusCircle className="size-4 mr-2" />
            Create your course
          </Button>
        </Link>
      </div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <p className="text-lg mb-4">You don’t have any courses yet.</p>
          <Link href={"/admin/courses/create"}>
            <Button>
              <PlusCircle className="size-4 mr-2" />
              Create your first course
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
          {data.map((course) => (
            <AdminCourseCard data={course} key={course.id} />
          ))}
        </div>
      )}
    </>
  );
}

function AdminCoursePageSkeleton(){
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}