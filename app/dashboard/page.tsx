import { EmptyState } from "@/components/EmptyState";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCoursesForUser } from "../data/user/get-erroll-course";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import { CourseProgressCard } from "./_components/CourseProgressCard";

export default async function DashboardUser() {
  const [courses, errollCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCoursesForUser(),
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-primary">Khoá học đã đăng ký</h1>
        <p>Tại đây bạn có thể xem tất cả khoá học mà bạn đã đăng ký</p>
      </div>

      {errollCourses.length === 0 ? (
        <EmptyState
          title="Bạn chưa đăng ký khoá học nào"
          description="Hiện tại bạn chưa mua bất kỳ khoá học nào"
          actionHref="/courses"
          actionLabel="Đăng ký khoá học"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {errollCourses.map((course) => (
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-primary">Khoá học dành cho bạn</h1>
          <p className="text-muted-foreground">
            Tại đây bạn có thể xem tất cả khoá học mà bạn có thể học thêm
          </p>
        </div>

        {courses.filter(
          (course) =>
            !errollCourses.some(
              ({ Course: errolled }) => errolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="Không có khoá học nào dành cho bạn"
            description=""
            actionHref="/"
            actionLabel=""
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses
              .filter(
                (course) =>
                  !errollCourses.some(({ Course: err }) => err.id === course.id)
              )
              .map((course) => (
                <PublicCourseCard data={course} key={course.id} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
