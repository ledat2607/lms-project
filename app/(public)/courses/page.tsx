import { getAllCourses } from "@/app/data/course/get-all-courses";
import PublicCoursePage from "./_components/PublicCoursePage";

export default async function Page() {
  // gọi API / DB trên server
  const courses = await getAllCourses();

  // truyền courses xuống client
  return <PublicCoursePage initialCourses={courses} />;
}
