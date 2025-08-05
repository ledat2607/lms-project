import { Skeleton } from "@/components/ui/skeleton";

export function LessonSkeleton(){
    return (
      <div className="flex flex-col h-full pl-6">
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-3 gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/2" />
            <Skeleton className="h-4 w-4/2" />
          </div>
        </div>
      </div>
    );
}