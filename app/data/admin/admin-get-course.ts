import "server-only";
import { requiredAdmin } from "./required-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetSingleCourse(id:string){

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await requiredAdmin();


    const data = await prisma.course.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        smallDescription: true,
        description: true,
        price: true,
        duration: true,
        status: true,
        level: true,
        fileKey: true,
        slug: true,
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
        chapter: {
          select: {
            id: true,
            title: true,
            position: true,
            lessons: {
              select: {
                id: true,
                title: true,
                description: true,
                thumbnailUrl: true,
                videoUrl: true,
                position: true,
              },
            },
          },
        },
      },
    });
    if(!data){
        return notFound();
    }
    return data;
}


export type AdminCourseSignleType = Awaited<
  ReturnType<typeof adminGetSingleCourse>
>;