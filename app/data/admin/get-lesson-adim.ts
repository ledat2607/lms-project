import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";
import { notFound } from "next/navigation";

export async function adminGetLesson(lessonId:string){
    await requiredAdmin();

    const data = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        title: true,
        videoUrl: true,
        thumbnailUrl: true,
        description: true,
        id: true,
        position: true,
      },
    });
    if(!data){
        return notFound();
    }
    return data;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;