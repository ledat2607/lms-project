"use server";
import { requiredAdmin } from "@/app/data/admin/required-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { lessonSchema, LessonShemaType } from "@/lib/zodShema";

export async function updateLesson(
  data: LessonShemaType,
  lessonId: string
): Promise<ApiResponse> {
  await requiredAdmin();
  console.log(data);
  try {
    const result = lessonSchema.safeParse(data);
    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }
    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: result.data.name,
        description: result.data.description,
        thumbnailUrl: result.data.thumbnailUrl,
        videoUrl: result.data.videoUrl,
      },
    });
    return {
      status: "success",
      message: "Lesson updated successfull",
    };
  } catch {
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}
