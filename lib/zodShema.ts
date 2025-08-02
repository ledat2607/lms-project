  import z from "zod";

  export const CourseLevel = ["Beginner", "Intermediate", "Advanced"] as const;
  export const courseStatus = ["Draft", "Published", "Archived"] as const;
  export const CategoryCourses = [
    "Development",
    "Bussiness",
    "Finance",
    "It & Software",
    "Offical",
    "Design",
    "Marketing",
    "Healthy & Fitness",
    "Music",
  ] as const;


  export const courseSchemas = z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters" })
      .max(100, { message: "Title must be at most 100 characters" }),

    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters" }),

    fileKey: z.string().min(3, { message: "File is required" }),

    price: z.coerce
      .number()
      .min(1, { message: "Price is required" })
      .transform((n) => n as number),
    duration: z.coerce
      .number()
      .min(1, { message: "Duration must be at least 1 hour" })
      .max(100, { message: "Duration must be at most 100 hours" })
      .transform((n) => n as number),

    level: z.enum(CourseLevel, { message: "Level is required" }),

    category: z.enum(CategoryCourses),

    smallDescription: z
      .string()
      .min(3, { message: "Small description must be at least 3 characters" })
      .max(200, {
        message: "Small description must be at most 200 characters",
      }),

    slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),

    status: z.enum(courseStatus, { message: "Status is required" }),
  });


  export const chapterShema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    courseId: z.string().uuid({ message: "Invalid course ID" }),
  });

    export const lessonSchema = z.object({
      name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" }),
      courseId: z.string().uuid({ message: "Invalid course ID" }),
      chapterId: z.string().uuid({ message: "Invalid chapter ID" }),
      description: z.string(),
      thumbnailUrl: z.string().optional(),
      videoUrl: z.string().optional(),
    });

  export type CourseSchemasType = z.infer<typeof courseSchemas>;
  export type ChapterShemaType = z.infer<typeof chapterShema>;
  export type LessonShemaType = z.infer<typeof lessonSchema>;
