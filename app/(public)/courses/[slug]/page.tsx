import { getInvidualCourse } from "@/app/data/course/get-course";
import { RenderDescription } from "@/components/rich-text-editor/RenderDes";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ConstrucUrl } from "@/hooks/use-construct";
import {
  IconBook,
  IconCategory,
  IconChartBar,
  IconChevronDown,
  IconClock,
  IconPlayerPlay,
  IconStar,
} from "@tabler/icons-react";
import { CheckIcon, LayoutDashboard, TimerIcon } from "lucide-react";
import Image from "next/image";
import { CheckIfCourseBought } from "@/app/data/user/user-is-errolled";
import Link from "next/link";
import { ErrollmentButton } from "./_components/ErrollButton";

type Params = Promise<{ slug: string }>;

function getUserImageUrl(image?: string | null) {
  if (!image) return "";

  // Nếu link đã bắt đầu bằng http thì giữ nguyên (GitHub, Google, vv.)
  if (image.startsWith("https")) {
    return image;
  }

  // Nếu chỉ là tên file thì thêm prefix storage URL
  return `https://lms-project-datn.t3.storage.dev/${image}`;
}

export default async function CourseSlugPage({ params }: { params: Params }) {
  const { slug } = await params;

  const course = await getInvidualCourse(slug);
  const Thumbnail = ConstrucUrl(course.fileKey);
  
  const isErrolled = await CheckIfCourseBought(course.id);
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
      {/*left*/}
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={Thumbnail}
            alt="Thumbnail image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h1 className="font-bold text-4xl capitalize tracking-tight">
              {course.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {course.smallDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge className="flex items-center gap-3 p-2">
              <IconChartBar className="size-6" />
              <span className="text-md">{course.level}</span>
            </Badge>
            <Badge className="flex items-center gap-3 p-2">
              <LayoutDashboard className="size-6" />
              <span className="text-md">{course.Category.name}</span>
            </Badge>
            <Badge className="flex items-center gap-3 p-2">
              <TimerIcon className="size-6" />
              <span className="text-md">{course.duration} giờ</span>
            </Badge>
          </div>
          <Separator className="my-8 bg-primary" />
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              Mô tả khóa học
            </h2>
            <RenderDescription json={JSON.parse(course.description)} />
          </div>
        </div>
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2>Nội dung khóa học</h2>
            <div>
              {course.chapter.length} Chương |{" "}
              {course.chapter.reduce(
                (total, chapter) => total + chapter.lessons.length,
                0
              ) || 0}{" "}
              Bài học
            </div>
          </div>
          <div className="space-y-4">
            {course.chapter.map((chapter, index) => (
              <Collapsible key={chapter.id} defaultOpen={index === 0}>
                <Card className="p-0 overflow-hidden border-2 transition-all duration-300 hover:shadow-md gap-0">
                  <CollapsibleTrigger>
                    <div>
                      <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                              {index + 1}
                            </p>
                            <div>
                              <h3 className="text-xl font-semibold text-left">
                                {chapter.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 text-left">
                                {chapter.lessons.length} bài học
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={"outline"} className="text-sm">
                              {chapter.lessons.length} bài học
                            </Badge>
                            <IconChevronDown className="size-5 text-md" />
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-5 bg-muted/20">
                      <div className="p-6 pt-4 space-y-4">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent"
                          >
                            <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 hover:border-white border-primary">
                              <IconPlayerPlay className="size-4 text-muted-foreground group-hover:text-primary transition-colors hover:cursor-pointer hover:text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {lesson.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Bài học {lessonIndex + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
        <Separator className="my-8 bg-primary" />
        <span className="text-2xl font-semibold mt-6">
          Đánh giá về khóa học
        </span>
        {/* Reviews */}
        {course.reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 mb-4 bg-card shadow-sm mt-2"
          >
            <div className="flex items-start gap-3">
              {/* Avatar User */}
              <img
                src={getUserImageUrl(review.User?.image || "")}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                {/* User Name */}
                <p className="font-semibold">
                  {review.User?.name || "Ẩn danh"}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < review.rating ? (
                        <IconStar
                          fill="yellow"
                          className="size-4 border-yellow-500"
                        />
                      ) : (
                        <IconStar className=" size-4" />
                      )}
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="mt-2 text-muted-foreground">{review.comment}</p>

                {/* Created Time */}
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*Errollment card */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="mr-2 font-bold text-2xl">Giá</span>
                <span className="text-3xl font-bold text-primary ">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(course.price)}
                </span>
              </div>
              <Separator className="w-3/4 mt-2 bg-primary" />
              <div>
                <h4 className="font-medium text-xl mt-4">Bạn sẽ nhận được: </h4>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/40">
                      <IconClock className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Thời lượng khóa học</p>
                      <p className="text-sm">{course.duration} giờ</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/40">
                      <IconChartBar className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cấp độ khóa học</p>
                      <p className="text-sm">{course.level}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/40">
                      <IconCategory className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Danh mục khóa học</p>
                      <p className="text-sm">{course.Category.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/40">
                      <IconBook className="size-4" />
                    </div>
                    <div>
                      {course.chapter.reduce(
                        (total, chapter) => total + chapter.lessons.length,
                        0
                      ) || 0}{" "}
                      Bài học
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="mt-3 bg-primary/70" />
              <div className="mb-6 space-y-3">
                <h4 className="font-bold mt-3 text-xl">Khóa học bao gồm:</h4>
                <ul className="space-y-2 list-none">
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 text-green-800 dark:text-white px-2 py-2">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Truy cập trọn đời</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 text-green-800 dark:text-white px-2 py-2">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Truy cập trên máy tính & di động</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 text-green-800 dark:text-white  px-2 py-2">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Chứng chỉ hoàn thành</span>
                  </li>
                </ul>
              </div>

              {isErrolled ? (
                <Link
                  href={`/dashboard/${slug}`}
                  className={buttonVariants({
                    variant: "destructive",
                    className: "w-full",
                  })}
                >
                  Xem khóa học
                </Link>
              ) : (
                <ErrollmentButton courseId={course.id} />
              )}
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Bảo đảm hoàn tiền trong 30 ngày
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
