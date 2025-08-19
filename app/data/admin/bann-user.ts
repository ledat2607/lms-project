"use server";

import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";
import { revalidatePath } from "next/cache";


interface BanUserProps {
  banReason?: string;
  banExpires?: Date | null;
  userId: string;
}

export async function banUserAction({
  banReason,
  banExpires,
  userId,
}: BanUserProps) {
  await requiredAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  await prisma.user.update({
    where: { id: userId },
    data: {
      banned: true,
      banReason,
      banExpires,
    },
  });
  revalidatePath(`/admin/users`);

  return { success: true };
}


export async function Unbanned({userId}:{userId:string}){
  await requiredAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  await prisma.user.update({
    where: { id: userId },
    data: {
      banned: false,
      banReason: null,
      banExpires: null,
    },
  });
  revalidatePath(`/admin/users`);
  return { success: true };
}