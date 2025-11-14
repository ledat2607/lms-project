import { prisma } from "@/lib/db";

export async function getAllUsersProfile() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      amount: true,
      image: true,
      _count: {
        select: { errollment: true }, // lấy tổng enrollment cho từng user
      },
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

  // Trả về thêm field errollmentCount cho tiện
  return users.map((u) => ({
    ...u,
    errollmentCount: u._count.errollment,
  }));
}
