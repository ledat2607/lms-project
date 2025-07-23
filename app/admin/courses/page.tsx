import { adminGetCourses } from "@/app/data/admin/get-admin-course";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { AdminCourseCard } from "./_components/AdminCourseCard";

export default async function CoursesPage(){
  const data = await adminGetCourses()
    return (
      <>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold uppercase">Your course</h1>
          <Link href={"/admin/courses/create"}>
            <Button variant={"default"}>
              <PlusCircle className="size-4" />
              Create course
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
          {data.map((course)=>(
            <AdminCourseCard data={course} key={course.id} />
          ))}
        </div>
      </>
    );
}