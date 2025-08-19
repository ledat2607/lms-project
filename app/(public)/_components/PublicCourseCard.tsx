import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstrucUrl } from "@/hooks/use-construct";
import { LayoutDashboard, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: iAppProps) {
    const thumbnailUrl = useConstrucUrl(data.fileKey);
  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.level}</Badge>
      <Image
        src={thumbnailUrl}
        alt="thumbnail"
        width={400}
        height={600}
        className="w-full rounded-t-xl aspect-video"
      />
      <CardContent className="p-4">
        <Link
          href={`/courses/${data.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.smallDescription}
        </p>
        <div className="flex items-center mt-4 gap-x-5 justify-between">
          <div className="flex items-center gap-2">
            <TimerIcon className="size-5 rounded-md text-primary" />
            <p className="font-bold text-primary">{data.duration} hours</p>
          </div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="size-5 rounded-md text-primary" />
            <p className="font-bold text-primary">{data.Category.name}</p>
          </div>
        </div>
        <Button variant={"outline"} className="w-full mt-4 !border-rose-500">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data.price)}
        </Button>
        <Link
          href={`/courses/${data.slug}`}
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

export function PublicCourseCardSkeleton(){
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