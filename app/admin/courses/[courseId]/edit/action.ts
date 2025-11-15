"use server";

import { requiredAdmin } from "@/app/data/admin/required-admin";
import arcject, { detectBot, fixedWindow } from "@/lib/arcject";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import {
  chapterShema,
  ChapterShemaType,
  courseSchemas,
  CourseSchemasType,
  lessonSchema,
  LessonShemaType,
} from "@/lib/zodShema";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcject
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function editCourse(
  data: CourseSchemasType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requiredAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, { fingerprint: user.user.id });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You can't able to access to this page",
        };
      } else {
        return {
          status: "error",
          message: "You're bot! If this is mistake contact out support",
        };
      }
    }

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

export async function reorderLessons(
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string
): Promise<ApiResponse> {
  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: "error",
        message: "Invalid lessons",
      };
    }
    const update = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId: chapterId,
        },
        data: {
          position: lesson.position,
        },
      })
    );
    await prisma.$transaction(update);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Re-order successfull",
    };
  } catch {
    return {
      status: "error",
      message: "Failed",
    };
  }
}

export async function reorderChapter(
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: "error",
        message: "No chapter provider",
      };
    }
    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    );
    await prisma.$transaction(updates);

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Chapter re-order position successfull",
    };
  } catch {
    return {
      status: "error",
      message: "Failed",
    };
  }
}

//create chapter
export async function createChapter(
  values: ChapterShemaType
): Promise<ApiResponse> {
  try {
    const result = chapterShema.safeParse(values);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }
    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.chapter.findFirst({
        where: {
          courseId: result.data.courseId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });
      await tx.chapter.create({
        data: {
          title: result.data.name,
          courseId: result.data.courseId,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });
    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
    return {
      status: "success",
      message: "Created new chapter",
    };
  } catch {
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}

//create lesson
export async function createLesson(
  values: LessonShemaType
): Promise<ApiResponse> {
  try {
    const result = lessonSchema.safeParse(values);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }
    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.lesson.findFirst({
        where: {
          chapterId: result.data.chapterId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });
      await tx.lesson.create({
        data: {
          title: result.data.name,
          description: result.data.description,
          chapterId: result.data.chapterId,
          thumbnailUrl: result.data.thumbnailUrl,
          videoUrl: result.data.videoUrl,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });
    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
    return {
      status: "success",
      message: "Created new lesson ",
    };
  } catch (error) {
    console.error("Create lesson error:", error);
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}

//delet lesson

export async function deleteLesson({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    const chapterWithLesson = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        lessons: {
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
          },
        },
      },
    });
    if (!chapterWithLesson) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }
    const lessons = chapterWithLesson.lessons;

    const lessonDelete = lessons.find((lesson) => lesson.id === lessonId);

    if (!lessonDelete) {
      return {
        status: "error",
        message: "Lesson not found",
      };
    }
    const remainingLesson = lessons.filter((lesson) => lesson.id !== lessonId);
    const updates = remainingLesson.map((lesson, index) => {
      return prisma.lesson.update({
        where: {
          id: lesson.id,
        },
        data: {
          position: index + 1,
        },
      });
    });
    await prisma.$transaction([
      ...updates,
      prisma.lesson.delete({
        where: {
          id: lessonId,
          chapterId: chapterId,
        },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Delete lesson successfull",
    };
  } catch {
    return { status: "error", message: "Failed" };
  }
}

export async function deleteChapter({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    const courseWithChapter = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        chapter: {
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });
    if (!courseWithChapter) {
      return {
        status: "error",
        message: "Course not found",
      };
    }
    const chapters = courseWithChapter.chapter;

    const chapterDelete = chapters.find((chapter) => chapter.id === chapterId);

    if (!chapterDelete) {
      return {
        status: "error",
        message: "Lesson not found",
      };
    }
    const remainingChapter = chapters.filter((chap) => chap.id !== chapterId);

    const updates = remainingChapter.map((chap, index) => {
      return prisma.chapter.update({
        where: {
          id: chap.id,
        },
        data: {
          position: index + 1,
        },
      });
    });
    await prisma.$transaction([
      ...updates,
      prisma.chapter.delete({
        where: {
          id: chapterId,
        },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Delete chapter successfull",
    };
  } catch {
    return { status: "error", message: "Failed" };
  }
}
