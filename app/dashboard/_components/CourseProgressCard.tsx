"use client";
import { EnrolledCourseCard } from "@/app/data/user/get-erroll-course";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ConstrucUrl } from "@/hooks/use-construct";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: EnrolledCourseCard;
}

export function CourseProgressCard({ data }: iAppProps) {
  const thumbnailUrl = ConstrucUrl(data.Course.fileKey);
  const { totalLessons, progressPercent, completedLesson } = useCourseProgress({
    /* eslint-disable @typescript-eslint/no-explicit-any */

    courseData: data.Course as any,
  });
  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.Course.level}</Badge>
      <Image
        src={thumbnailUrl}
        alt="thumbnail"
        width={400}
        height={600}
        className="w-full rounded-t-xl aspect-video"
      />
      <CardContent className="p-4">
        <Link
          href={`/dashboard/${data.Course.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.Course.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.Course.smallDescription}
        </p>
        <div className="space-y-4">
          <div>
            <p>Progress</p>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
          <div>
            <p className="text-xs font-bold">
              {" "}
              Completed {completedLesson} lesson of total {totalLessons} lessons{" "}
            </p>
          </div>
        </div>
        <Link
          href={`/dashboard/${data.Course.slug}`}
          className={buttonVariants({
            variant: "destructive",
            className: "w-full mt-4",
          })}
        >
          Learn more
        </Link>
      </CardContent>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative p-0 gap-0">
      <div className="absolute top-2 right-2 flex items-center">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-lg aspect-video" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-6 w-8" />
          </div>
        </div>
        <Skeleton className="mt-4 w-full h-10 rounded-md" />
      </CardContent>
    </Card>
  );
}
