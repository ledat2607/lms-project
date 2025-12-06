"use client";
import { EnrolledCourseCard } from "@/app/data/user/get-erroll-course";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ConstrucUrl } from "@/hooks/use-construct";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { Pencil, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ReviewModal } from "./review-modal";

interface iAppProps {
  data: EnrolledCourseCard;
}

export function CourseProgressCard({ data }: iAppProps) {
  const thumbnailUrl = ConstrucUrl(data.Course.fileKey);
  const [openModal, setOpenModal] = useState(false);
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
            <p>Hoàn thành</p>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
          <div>
            <p className="text-xs font-bold">
              {" "}
              Hoàn thành {completedLesson} bài học trong tổng số {totalLessons}{" "}
              bài học{" "}
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center justify-between gap-2">
          <Link
            href={`/dashboard/${data.Course.slug}`}
            className={buttonVariants({
              variant: "destructive",
              className: "lg:w-[60%] w-full mt-4",
            })}
          >
            <Send className="mr-2" /> Truy cập
          </Link>
          <Link
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
            className={buttonVariants({
              variant: "outline",
              className: "lg:w-[30%] w-full mt-4 p-2",
            })}
          >
            <Pencil className="mr-2" />
            Đánh giá
          </Link>
          <ReviewModal
            courseId={data.Course.id}
            open={openModal}
            onClose={() => setOpenModal(false)}
            courseTitle={data.Course.title}
          />
        </div>
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
