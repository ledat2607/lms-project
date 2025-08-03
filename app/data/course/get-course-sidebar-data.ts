import "server-only";
import { requireUser } from "../user/require-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";


export async function getCourseSidebarData(slug: string) {
  const session = await requireUser();

  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      fileKey: true,
      level: true,
      slug: true,
      category: true,
      chapter: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
              lessonProgress: {
                where: {
                  userId: session.id,
                },
                select: {
                  completed: true,
                  lessonId: true,
                  id: true,
                },
              },
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });
  if(!course){
    return notFound();
  }
  const errollment = await prisma.errollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.id,
        courseId: course.id,
      },
    },
  });
  if (!errollment || errollment.status !== "Active") {
    return notFound();
  }
  return {
    course,
  };
}

export type CouseSidebarDataType = Awaited<
  ReturnType<typeof getCourseSidebarData>
>;