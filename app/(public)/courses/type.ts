import { $Enums } from "@/lib/generated/prisma";

export type CourseItem = {
  id: string;
  title: string;
  fileKey: string;
  price: number;
  duration: number;
  level: $Enums.CourseLevel;
  smallDescription: string;
  slug: string;
  Category: {
    id: string;
    name: string;
  };
};
