import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";

export async function adminGetCourses(){
    await requiredAdmin();

    const data = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        smallDescription: true,
        price: true,
        duration: true,
        status: true,
        level: true,
        fileKey: true,
        slug: true,
        category: true,
      },
    });
    return data;
} 

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0];