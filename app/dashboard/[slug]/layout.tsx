import { ReactNode } from "react";
import { CouseSidebar } from "../_components/CourseSidebar";

export default function CourseLayout({children}:{children:ReactNode}){
    return (
      <div className="flex flex-1">
        <div className="w-80 border-r border-border shrink-0">
          <CouseSidebar />
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    );
}