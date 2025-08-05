import "server-only";
import { requireUser } from "../user/require-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getLessonContent(lessionId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await requireUser();

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessionId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailUrl: true,
      videoUrl: true,
      position: true,
      lessonProgress: {
        where: {
          userId: session.id,
        },
        select: {
          completed: true,
          lessonId: true,
        },
      },
      Chapter: {
        select: {
          courseId: true,
          Course: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });
  if (!lesson) {
    return notFound();
  }
  const errollment = await prisma.errollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.id,
        courseId: lesson.Chapter?.courseId as string,
      },
    },
    select: {
      status: true,
    },
  });
  if (!errollment || errollment.status !== "Active") {
    return notFound();
  }
  return lesson;
}

export type LessonContentType = Awaited<ReturnType<typeof getLessonContent>>;
