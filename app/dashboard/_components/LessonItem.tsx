import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Play } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  lesson: {
    id: string;
    title: string;
    position: number;
    description: string | null;
  };
  slug: string;
  isActive?: boolean;
  completed: boolean;
}

export function LessonItem({ lesson, slug, isActive, completed }: iAppProps) {
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed ? "completed" : "outline",
        className: cn(
          "w-full p-2.5 h-auto justify-start transition-all",
          completed && "bg-green-400 hover:bg-green-600"
        ),
      })}
    >
      <div className="flex  items-center gap-2.5 w-full min-w-0">
        <div className="shrink-0">
          {completed ? (
            <div className="size-5 rounded-full border-2 bg-background flex justify-center items-center ">
              <Check className={cn("size-2.5 text-green-500")} />
            </div>
          ) : (
            <div className="size-5 rounded-full border-2 bg-background flex justify-center items-center ">
              <Play className={cn("size-2.5 text-primary")} />
            </div>
          )}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-xs font-medium">
            {lesson.position}: {lesson.title}
          </p>
          {completed && (
            <p className="text-[10px] text-white font-bold">Completed</p>
          )}
          {isActive && !completed && (
            <p className="text-xs font-semibold">Currently watching</p>
          )}
        </div>
      </div>
    </Link>
  );
}