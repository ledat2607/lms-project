import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";

export async function adminGetDashboardStat(){
    await requiredAdmin();

    const [
      totalSignups,
      totalCustomers,
      totalCourses,
      totalLessons,
      totalAmountResult,
    ] = await Promise.all([
      //total signups
      prisma.user.count(),

      //total customer
      prisma.user.count({
        where: {
          errollment: {},
        },
      }),

      //total course
      prisma.course.count(),

      //total lesson
      prisma.lesson.count(),

      //total amont
      prisma.errollment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          status: "Active",
        },
      }),
    ]);
    const totalAmount = totalAmountResult?._sum.amount ?? 0;
    return {
      totalSignups,
      totalCustomers,
      totalCourses,
      totalLessons,
      totalAmount,
    };
}