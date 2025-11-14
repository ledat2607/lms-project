"use client";

import { PublicCourseCard } from "../../_components/PublicCourseCard";

export default function CoursesGrid({
  initialCourses,
  selectedCategory,
  nameCourse,
}: {
  initialCourses: any[];
  selectedCategory: string | null;
  nameCourse?: string | null;
}) {
  const filtered = initialCourses
    // lọc theo category
    .filter((c) =>
      selectedCategory ? c.Category.id === selectedCategory : true
    )
    // lọc theo tên course
    .filter((c) =>
      nameCourse
        ? c.title.toLowerCase().includes(nameCourse.toLowerCase())
        : true
    );

  if (filtered.length === 0) {
    return (
      <p className="text-center text-muted-foreground flex items-center justify-center mt-20">
        Không khóa học nào tìm thấy
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {filtered.map((course) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}
