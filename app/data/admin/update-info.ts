"use server";


import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";

type UpdateUserInput = {
  name?: string;
  email?: string;
  image?: string;
  amount?: number;
};

export async function updateAdminProfile(data: UpdateUserInput) {
  const session = await requiredAdmin();

  const updatedUser = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.image && { image: data.image }),
      ...(typeof data.amount === "number" && { amount: data.amount }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      amount: true,
      image: true,
    },
  });

  return updatedUser;
}
