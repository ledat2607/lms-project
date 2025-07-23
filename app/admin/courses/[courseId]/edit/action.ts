"use server";

import { requiredAdmin } from "@/app/data/admin/required-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { courseSchemas, CourseSchemasType } from "@/lib/zodShema";

export async function editCourse(
  data: CourseSchemasType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requiredAdmin();

  try {
    const result = await courseSchemas.safeParse(data);

    if (!result.success) {
      return { status: "error", message: "Invalid data" };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    });
    return {
      status: "success",
      message: "Course updated successfull",
    };
  } catch {
    return {
      status: "error",
      message: "Invalid",
    };
  }
}
