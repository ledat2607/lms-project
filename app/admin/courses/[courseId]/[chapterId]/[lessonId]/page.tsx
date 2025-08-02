import { adminGetLesson } from "@/app/data/admin/get-lesson-adim";
import { LessonForm } from "./_components/LessonForm";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

export default async function LessonPage({ params }: { params: Params }) {
  const { chapterId, lessonId, courseId } = await params;
  const lesson = await adminGetLesson(lessonId);

  return (
    <div>
      <LessonForm chapterId={chapterId} data={lesson} courseId={courseId} />
    </div>
  );
}
