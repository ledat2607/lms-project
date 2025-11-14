import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";

export async function adminGetInfo() {

  const data = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { role: "admin" },
    select: {
      id: true,
      email: true,
      name: true,
      amount: true,
      image: true,
      banned: true,
    },
  });
  return data;
}



export type UserAdminType = Awaited<ReturnType<typeof adminGetInfo>>[0];
