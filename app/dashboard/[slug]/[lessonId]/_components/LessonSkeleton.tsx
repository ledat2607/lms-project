import { Skeleton } from "@/components/ui/skeleton";

export function LessonSkeleton(){
    return (
      <div className="flex flex-col h-full pl-6">
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    );
}