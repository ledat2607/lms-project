'use server'

import { requiredAdmin } from "@/app/data/admin/required-admin"
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type"
import { revalidatePath } from "next/cache";

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
  await requiredAdmin();
  try {

   await prisma.course.delete({
     where: {
       id: courseId,
     },
   });
   revalidatePath(`/admin/courses`);
   return {
     status: "success",
     message: "Delete Successfulll",
   };
  } catch {
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}