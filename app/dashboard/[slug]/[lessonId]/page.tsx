import { getLessonContent } from "@/app/data/course/get-lesson.content";
import { CourseContentId } from "./_components/CourseContent";
import { Suspense } from "react";

type Params = Promise<{ lessonId: string }>;

export default async function LessonContentPage({ params }: { params: Params }) {
    const { lessonId } = await params;
 return (
   <Suspense fallback>
     <LessonContentLoader lessonId={lessonId} />;
   </Suspense>
 );
}


async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  const data = await getLessonContent(lessonId);
  return <CourseContentId data={data} />;
}