import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getInvidualCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      title: true,
      price: true,
      description: true,
      slug: true,
      fileKey: true,
      id: true,
      level: true,
      duration: true,
      category: true,
      smallDescription: true,
      chapter: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if(!course){
    return notFound();
  }
  return course;
}