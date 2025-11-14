import { prisma } from "@/lib/db";
import { requireUser } from "./require-user";
import { notFound } from "next/navigation";

export async function getUserProfile(){
    const session = await requireUser();

    const userInfo = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        amount: true,
        image: true,

        errollment: {
          select: {
            id: true,
            amount: true,
            courseId: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });
    if(!userInfo){
        return notFound();
    }
    return userInfo;
}