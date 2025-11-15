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
} from "@tabler/icons-react";
import { CheckIcon, LayoutDashboard, TimerIcon } from "lucide-react";
import Image from "next/image";
import { CheckIfCourseBought } from "@/app/data/user/user-is-errolled";
import Link from "next/link";
import { ErrollmentButton } from "./_components/ErrollButton";

type Params = Promise<{ slug: string }>;

export default async function CourseSlugPage({ params }: { params: Params }) {
  const { slug } = await params;

  const course = await getInvidualCourse(slug);
  const Thumbnail = ConstrucUrl(course.fileKey);

  const isErrolled = await CheckIfCourseBought(course.id);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
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
              {/* <span className="text-md">{course}</span> */}
            </Badge>
            <Badge className="flex items-center gap-3 p-2">
              <TimerIcon className="size-6" />
              <span className="text-md">{course.duration} hours</span>
            </Badge>
          </div>
          <Separator className="my-8 bg-primary" />
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Description
            </h2>
            <RenderDescription json={JSON.parse(course.description)} />
          </div>
        </div>
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2>Course Content</h2>
            <div>
              {course.chapter.length} Chapter |{" "}
              {course.chapter.reduce(
                (total, chapter) => total + chapter.lessons.length,
                0
              ) || 0}{" "}
              Lesson
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
                                {chapter.lessons.length} lessons
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={"outline"} className="text-sm">
                              {chapter.lessons.length} lesson
                              {chapter.lessons.length !== 1 ? "s" : ""}
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
                                Lesson {lessonIndex + 1}
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
      </div>
      {/*Errollment card */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="mr-2 font-bold text-2xl">Price</span>
                <span className="text-3xl font-bold text-primary ">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(course.price)}
                </span>
              </div>
              <Separator className="w-3/4 mt-2 bg-primary" />
              <div>
                <h4 className="font-medium text-xl mt-4">
                  What will you get:{" "}
                </h4>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/40">
                      <IconClock className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Duration</p>
                      <p className="text-sm">{course.duration} hours</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/40">
                      <IconChartBar className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Level</p>
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
                      <p className="text-sm font-medium">Course Category</p>
                      {/* <p className="text-sm">{course.category}</p> */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/40">
                      <IconBook className="size-4" />
                    </div>
                    <div>
                      {/* {course.chapter.reduce(
                        (total, chapter) => total + chapter.lessons.length,
                        0
                      ) || 0}{" "} */}
                      Lesson
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="mt-3 bg-primary/70" />
              <div className="mb-6 space-y-3">
                <h4 className="font-bold mt-3 text-xl">This course include:</h4>
                <ul className="space-y-2 list-none">
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 text-green-800 dark:text-white px-2 py-2">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 text-green-800 dark:text-white px-2 py-2">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Access on Desktop & Mobile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 text-green-800 dark:text-white  px-2 py-2">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>

              {isErrolled ? (
                <Link
                  href={"/"}
                  className={buttonVariants({
                    variant: "destructive",
                    className: "w-full",
                  })}
                >
                  Watch course
                </Link>
              ) : (
                <ErrollmentButton courseId={course.id} />
              )}
              <p className="mt-3 text-center text-xs text-muted-foreground">
                30 Days money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
