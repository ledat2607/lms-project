"use client";
import { CouseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown, Play } from "lucide-react";
import { LessonItem } from "./LessonItem";
import { usePathname } from "next/navigation";

interface iAppProps {
  course: CouseSidebarDataType["course"];
}

export function CouseSidebar({ course }: iAppProps) {
  const pathName = usePathname();
  const currentLessonId = pathName.split("/").pop();

  return (
    <div className="flex flex-col h-full">
      <div className="pb-4 pr-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <Play className="size-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base tracking-tighter truncate">
              {course.title}
            </h1>
            <p className="text-xs to-muted-foreground mt-1">
              {course.category}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-primary font-bold">Progress</span>
            <span>4/10</span>
          </div>
          <Progress value={55} className="h-1.5" />
          <p className="text-xs font-medium text-muted-foreground">
            55% completed
          </p>
        </div>
      </div>

      <div className="py-4 pr-4 space-y-3">
        {course.chapter.map((chapter, index) => (
          <Collapsible key={chapter.id} defaultOpen={index === 0}>
            <CollapsibleTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full p-3 h-auto flex items-center gap-2"
              >
                <div className="shrink-0">
                  <ChevronDown className="size-4 text-primary" />
                </div>
                <div className="flex items-center w-full justify-between">
                  <p className="font-semibold text-left">
                    {chapter.position}: {chapter.title}
                  </p>
                  <p className="text-[12px] text-muted-foreground truncate font-medium">
                    {chapter.lessons.length}
                  </p>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 pl-6 border-l-2 space-y-3">
              {chapter.lessons.map((lesson) => (
                <LessonItem
                  lesson={lesson}
                  slug={course.slug}
                  key={lesson.id}
                  isActive={currentLessonId === lesson.id}
                  completed={
                    lesson.lessonProgress.find(
                      (progress) => progress.id === lesson.id
                    )?.completed || false
                  }
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
