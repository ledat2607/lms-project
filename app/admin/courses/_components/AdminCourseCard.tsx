import { AdminCourseType } from "@/app/data/admin/get-admin-course";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConstrucUrl } from "@/hooks/use-construct";
import {
  ArrowRight,
  EyeIcon,
  MoreVertical,
  Pencil,
  School,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteCourseDialog } from "./DeleteCourse";
import { Skeleton } from "@/components/ui/skeleton";
import { IconDashboard } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

interface iAdminCourseTypeProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: iAdminCourseTypeProps) {
  return (
    <Card className="group relative py-0 gap-0">
      {/*absolute dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} size={"icon"}>
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <Pencil className="size-4 mr-2" />
                Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${data.slug}`}>
                <EyeIcon className="size-4 mr-2" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="bg-primary text-white">
              <DeleteCourseDialog courseId={data.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Image
        src={ConstrucUrl(data.fileKey)}
        alt="thumbnail"
        width={600}
        height={800}
        className="w-full rounded-t-lg aspect-video h-full object-cover"
      />

      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <Link
            href={`/admin/courses/${data.id}/edit`}
            className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
          >
            {data.title}
          </Link>
          <Badge>{data.status}</Badge>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.smallDescription}
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-2">
            <TimerIcon className="size-6 p-1 rounded-md text-white bg-primary/40" />
            <p className="text-sm text-muted-foreground">
              {data.duration} hours
            </p>
          </div>
          <div className="flex items-center gap-2">
            <School className="size-6 p-1 rounded-md text-white bg-primary/40" />
            <p className="text-sm text-muted-foreground">{data.level}</p>
          </div>
          <div className="flex items-center gap-2">
            <IconDashboard className="size-6 p-1 rounded-md text-white bg-primary/40" />
            <p className="text-sm text-muted-foreground">
              {data.Category.name}
            </p>
          </div>
        </div>
        <Link
          href={`/admin/courses/${data.id}/edit`}
          className={buttonVariants({ className: "w-full mt-4" })}
        >
          Edit Course <ArrowRight className="size-4 hover:animate-pulse" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function AdminCourseCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="size-8 rounded-md" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-lg aspect-video h-[250px] object-cover" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2 rounded" />
        <Skeleton className="h-4 w-full mb-4 rounded" />
        <div>
          <div className=" flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
          <div className=" flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
        </div>
        <Skeleton className="mt-4 h-10 w-full rounded" />
      </CardContent>
    </Card>
  );
}
