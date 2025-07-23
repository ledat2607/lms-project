import "server-only";
import { requiredAdmin } from "./required-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetSingleCourse(id:string){
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
        category: true,
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