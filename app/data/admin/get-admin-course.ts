import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";

interface Props {
  status?: string;
}

export async function adminGetCourses({ status }: Props) {
  await requiredAdmin();
    const data = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: status
        ? {
          /* eslint-disable @typescript-eslint/no-explicit-any */

            status: { equals: status as any },
          }
        : undefined,
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
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return data;
} 

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0];