import "server-only";

import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";

export async function getEnrolledCoursesForUser() {
  const user = await requireUser();

  const data = await prisma.errollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      Course: {
        select: {
          id: true,
          smallDescription: true,
          title: true,
          level: true,
          fileKey: true,
          slug: true,
          duration: true,
          category: true,
          price: true,
          chapter: {
            select: {
              id: true,
              title: true,
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      id: true,
                      completed: true,
                      lessonId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}

export type EnrolledCourseCard = Awaited<
  ReturnType<typeof getEnrolledCoursesForUser>
>[0];
