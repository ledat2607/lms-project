import { getAllCourses } from "@/app/data/course/get-all-courses";
import { getUserProfile } from "@/app/data/user/get-user-info";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useConstrucUrl } from "@/hooks/use-construct";
import { Button } from "@/components/ui/button";
import { EditProfileModal } from "./_components/EditProfileModal";
import { updateUserProfile } from "./action";

export default async function ProfilePage() {
  const user = await getUserProfile();
  const courses = await getAllCourses();

  // Lọc các khóa học đã đăng ký
  const enrolledCourses = courses.filter((course) =>
    user.errollment.some((e: any) => e.courseId === course.id)
  );
  return (
    <div className="w-full space-y-8 p-4">
      {/* Thông tin user */}
      <Card className="max-w-3xl">
        <CardHeader className="flex flex-row items-center gap-4 max-w-3xl">
          <Avatar className="w-16 h-16">
            {user.image && (
              <Image
                src={useConstrucUrl(user.image)}
                alt={user.name as string}
                fill
              />
            )}
            <AvatarFallback>
              {user.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex justify-between items-center w-full">
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription className="!px-0">{user.email}</CardDescription>
              <Badge variant="outline" className="mt-2">
                Total amount: {user.amount.toLocaleString()}₫
              </Badge>
            </div>
            <EditProfileModal
              user={{
                name: user.name as string,
                image: user.image as string,
                email: user.email as string,
              }}
              onSave={updateUserProfile} // server action truyền vào
            >
              <Button>Edit</Button>
            </EditProfileModal>
          </div>
        </CardHeader>
      </Card>

      {/* Danh sách khóa học đã đăng ký */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {enrolledCourses.map((course) => (
          <Card key={course.id}>
            <div className="relative w-full h-40">
              <Image
                src={useConstrucUrl(course.fileKey)}
                alt={course.title}
                fill
                className="rounded-t-md object-cover"
              />
            </div>
            <CardContent className="p-4 space-y-2">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription className="!px-0">
                {course.smallDescription}
              </CardDescription>
              {/* <Badge variant="outline">{course.category}</Badge> */}
              <div className="text-sm text-muted-foreground">
                Level: {course.level}
              </div>
              <div className="text-sm text-muted-foreground">
                Duration: {course.duration} giờ
              </div>
              <div className="font-medium mt-2">
                Price: {course.price.toLocaleString()}₫
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
