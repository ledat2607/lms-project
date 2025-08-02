import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function CheckIfCourseBought(courseId: string): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return false;

  const errollment = await prisma.errollment.findUnique({
    where: {
      userId_courseId: {
        courseId: courseId,
        userId: session.user.id,
      },
    },
    select: {
      status: true,
    },
  });

  return errollment?.status === "Active" ? true : false;
}