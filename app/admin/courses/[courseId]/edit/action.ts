"use server";

import { requiredAdmin } from "@/app/data/admin/required-admin";
import arcject, { detectBot, fixedWindow } from "@/lib/arcject";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { courseSchemas, CourseSchemasType } from "@/lib/zodShema";
import { request } from "@arcjet/next";

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
