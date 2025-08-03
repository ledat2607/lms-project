

import { CouseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { useMemo } from "react";

interface iAppProps {
  courseData: CouseSidebarDataType["course"];
}

interface CourseProgressResult {
  totalLessons: number;
  completedLesson: number;
  progressPercent: number;
}

export function useCourseProgress({ courseData }: iAppProps): CourseProgressResult {
  return useMemo(() => {
    let totalLessons = 0;
    let completedLesson = 0;
    courseData.chapter.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        totalLessons++;

        const checkIsCompleted = lesson.lessonProgress.some(
          (progress) => progress.lessonId === lesson.id && progress.completed
        );
        if (checkIsCompleted) {
          completedLesson++;
        }
      });
    });
    const progressPercent =
      totalLessons > 0 ? Math.round((completedLesson / totalLessons) * 100) : 0;

    return {
      totalLessons,
      completedLesson,
      progressPercent,
    };
  }, [courseData]);
}
