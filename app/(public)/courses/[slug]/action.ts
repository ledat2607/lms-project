'use server'

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/type";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import arcject, { detectBot, fixedWindow } from "@/lib/arcject";
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
      max: 2,
    })
  );

export async function errollCourse(
  courseId: string
): Promise<ApiResponse | never> {
  const user = await requireUser();

  let checkOutUrl: string;
  try {
    const req = await request();
    const decision = await aj.protect(req, { fingerprint: user.id });

    // if (decision.isDenied()) {
    //   return {
    //     status: "error",
    //     message: "Failed",
    //   };
    // }
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
        stripePriceId: true,
      },
    });
    if (!course) {
      return {
        status: "error",
        message: "Course not found",
      };
    }
    let stripeCustomerId: string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });
    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: stripeCustomerId,
        },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingErrollment = await tx.errollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });
      if (existingErrollment?.status === "Active") {
        return {
          status: "success",
          message: "You are already erroll this course",
        };
      }
      let errollment;

      if (existingErrollment) {
        errollment = await tx.errollment.update({
          where: {
            id: existingErrollment.id,
          },
          data: {
            amount: course.price,
            status: "Pending",
            updatedAt: new Date(),
          },
        });
      } else {
        errollment = await tx.errollment.create({
          data: {
            userId: user.id,
            courseId: courseId,
            amount: course.price,
            status: "Pending",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
          {
            price: course.stripePriceId as string,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${env.BETTER_AUTH_URL}/payment/success`,
        cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
        metadata: {
          userId: user.id,
          courseId: course.id,
          errollmentId: errollment.id,
        },
      });
      return {
        errollment: errollment,
        checkOutUrl: checkoutSession.url,
      };
    });
    checkOutUrl = result.checkOutUrl as string;
  } catch (error) {
    console.error("Enrollment error:", error); 
   if (error instanceof Stripe.errors.StripeError) {
     return {
       status: "error",
       message: "Payment failed",
     };
   }
    return {
      status: "error",
      message: "Internal server error",
    };
  }
  redirect(checkOutUrl);
}