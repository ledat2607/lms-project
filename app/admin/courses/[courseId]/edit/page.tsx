import { adminGetSingleCourse } from "@/app/data/admin/admin-get-course";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCourseComponent } from "./_components/EditCourse";
import { CourseConstructure } from "./_components/CourseConstructure";
import Link from "next/link";

type Params = Promise<{ courseId: string }>;

export default async function CourseEditPage({ params }: { params: Params }) {
    const { courseId } = await params;
    const data = await adminGetSingleCourse(courseId);

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">
          Cập nhật thông tin khóa học:{" "}
          <Link href={`/admin/courses`}>
            <span className="text-primary underline">{data.title}</span>
          </Link>
        </h1>

        <Tabs defaultValue="basic-info" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="basic-info">Thông Tin Cơ Bản</TabsTrigger>
            <TabsTrigger value="course-structure">
              Cấu Trúc Khóa Học
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic-info">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Cơ Bản</CardTitle>
                <CardDescription className="!px-0">
                  Thông tin cơ bản về khóa học
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EditCourseComponent data={data} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="course-structure">
            <Card>
              <CardHeader>
                <CardTitle>Cấu Trúc Khóa Học</CardTitle>
                <CardDescription className="!px-0">
                  Tại đây bạn có thể cập nhật cấu trúc khóa học của mình
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CourseConstructure data={data} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
}
