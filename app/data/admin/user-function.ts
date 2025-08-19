import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";

export async function adminGetUser() {
    await requiredAdmin();
    const data = await prisma.user.findMany({
      orderBy: {
        amount: "desc",
      },
      where: { role: "user" },
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



export type UserAdminType = Awaited<ReturnType<typeof adminGetUser>>[0];
