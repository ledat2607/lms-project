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
        <h1 className="text-3xl font-bold text-primary">Erroll Courses</h1>
        <p>Here you can see all course you have access to</p>
      </div>
      {errollCourses.length === 0 ? (
        <EmptyState
          title="No course purchased"
          description="You have not purchased any course"
          actionHref="/courses"
          actionLabel="Erroll course"
        />
      ) : (
        <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {errollCourses.map((course) => (
            // <PublicCourseCard key={course.Course.id} data={course.Course} />
            // <Link
            //   href={`/dashboard/${course.Course.slug}`}
            //   key={course.Course.id}
            // >
            //   {course.Course.title}
            // </Link>
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}
      <section className="mt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-primary">
            Available course for you
          </h1>
          <p className="text-muted-foreground">
            Here you can see any course for you
          </p>
        </div>
        {courses.filter(
          (course) =>
            !errollCourses.some(
              ({ Course: errolled }) => errolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No course available for you"
            description=""
            actionHref="/"
            actionLabel=""
          />
        ) : (
          <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
