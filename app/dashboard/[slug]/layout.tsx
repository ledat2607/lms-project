import { ReactNode } from "react";
import { CouseSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface iAppProps{
  children : ReactNode
  params:Promise<{slug:string}>
}

export default async function CourseLayout({children,params}:iAppProps){
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

    return (
      <div className="flex flex-1">
        <div className="w-80 border-r border-border shrink-0">
          <CouseSidebar course={course.course} />
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    );
}