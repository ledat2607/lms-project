"use client";

import { useState } from "react";
import CoursesGrid from "./CoursesGrid";
import { Input } from "@/components/ui/input";
import CategoryList from "./CategoryList ";

export default function PublicCoursePage({ initialCourses }: { initialCourses: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [name, setName] = useState("");

  return (
    <div className="mt-5">
      {/* Tiêu đề trang */}
      <div className="flex flex-col space-y-2 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Khám Phá Khóa Học
        </h1>
        <p className="text-muted-foreground">
          Khám phá hàng loạt khóa học được thiết kế giúp bạn đạt được mục tiêu
          học tập của mình.
        </p>
      </div>

      {/* Danh mục khóa học */}
      <CategoryList
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Thanh tìm kiếm */}
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tìm kiếm tên khóa học..."
        className="mt-4 w-[50%] border-black"
      />

      {/* Danh sách khóa học */}
      <CoursesGrid
        initialCourses={initialCourses}
        selectedCategory={selectedCategory}
        nameCourse={name}
      />
    </div>
  );
}
