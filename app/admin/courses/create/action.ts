"use server";

import { requiredAdmin } from "@/app/data/admin/required-admin";
import arcject, { detectBot, fixedWindow } from "@/lib/arcject";
import { auth } from "@/lib/auth";
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

export async function CreateCourse(
  values: CourseSchemasType
): Promise<ApiResponse> {
  const session = await requiredAdmin();
  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if(decision.isDenied()){
      if(decision.reason.isRateLimit()){
        return {
          status: "error",
          message: "You can't able to access to this page",
        };
      }else{
        return {
          status: "error",
          message: "You're bot! If this is mistake contact out support",
        };
      }
    }

    const validation = courseSchemas.safeParse(values);
    if (!validation.success) {
      throw new Error("Something failed");
    }
    const data = await prisma.course.create({
      data: { ...validation.data, userId: session?.user.id as string },
    });
    return {
      status: "success",
      message: "Create course successfull.",
    };
  } catch {
    return {
      status: "error",
      message: "Intenal server error",
    };
  }
}
