"use server";

import { requiredAdmin } from "@/app/data/admin/required-admin";
import arcject, { detectBot, fixedWindow } from "@/lib/arcject";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
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

    const validation = courseSchemas.safeParse(values);
    if (!validation.success) {
      throw new Error("Something failed");
    }

    const data = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.smallDescription,
      default_price_data: {
        currency: "vnd",
        unit_amount: validation.data.price,
      },
    });

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
        stripePriceId: data.default_price as string,
      },
    });
    return {
      status: "success",
      message: "Create course successfull.",
    };
  } catch (error) {
    console.error("CreateCourse error:", error);
    return {
      status: "error",
      message: "Intenal server error",
    };
  }
}

export async function GetCategory() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return {
      status: "success",
      message: "GetCategory success",
      categories,
    };
  } catch (error) {
    console.error("GetCategory error:", error);
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}
export async function CreateCategory(name: string) {
  try {
    const category = await prisma.category.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"), // basic slug generation
      },
    });
    return { status: "success", category };
  } catch (error) {
    console.error("CreateCategory error:", error);
    return { status: "error", message: "Failed to create category" };
  }
}
