"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface UpdateProfilePayload {
  name: string;
  image: string;
  email: string;
}

export async function updateUserProfile(payload: UpdateProfilePayload) {
  const session = await requireUser();

  if (!session?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: session.id },
    data: {
      name: payload.name,
      image: payload.image,
      email: payload.email,
    },
  });

  // Optionally revalidate profile page
  revalidatePath("/dashboard/profile");

  return { success: true };
}
