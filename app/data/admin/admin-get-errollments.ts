import { prisma } from "@/lib/db";
import { requiredAdmin } from "./required-admin";

export async function adminGetErrolleMent() {
    await requiredAdmin();

    const thridDaysAgo = new Date();

    thridDaysAgo.setDate(thridDaysAgo.getDate() - 30);

    const errollments = await prisma.errollment.findMany({
      where: {
        createdAt: {
          gte: thridDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }); 
    const last30Days: { date: string; errollments: number }[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();

      date.setDate(date.getDate() - i);

      last30Days.push({
        date: date.toISOString().split("T")[0],
        errollments: 0,
      });
    }
    errollments.forEach((errollement)=>{
        const errollementDate = errollement.createdAt.toISOString().split("T")[0];

        const dayIndex = last30Days.findIndex(
          (day) => day.date === errollementDate
        );

        if(dayIndex !== -1){
            last30Days[dayIndex].errollments++;
        }
    })
    return last30Days;
}
