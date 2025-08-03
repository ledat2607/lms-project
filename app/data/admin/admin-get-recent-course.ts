import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";

export async function admingetRecentCourse() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await requiredAdmin();
  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      status: true,
      price: true,
      fileKey: true,
      slug: true,
      category: true,
    },
  });
  return data;
}
