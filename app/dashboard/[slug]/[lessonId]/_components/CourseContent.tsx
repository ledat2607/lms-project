"use client";
import { LessonContentType } from "@/app/data/course/get-lesson.content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDes";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstrucUrl } from "@/hooks/use-construct";
import { BookIcon, CheckCircle } from "lucide-react";
import { useTransition } from "react";
import { markCompleteLesson } from "../action";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/use-confetti";

interface iAppProps {
  data: LessonContentType;
}

export function CourseContentId({ data }: iAppProps) {
  const [pending, startTransittion] = useTransition();
  const { triggerConfetti } = useConfetti();
  function VideoPlayer({
    thumbnailUrl,
    videoUrl,
  }: {
    thumbnailUrl: string;
    videoUrl: string;
  }) {
    const videoLink = useConstrucUrl(videoUrl);
    const thumbnailLink = useConstrucUrl(thumbnailUrl);

    if (!videoUrl) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex items-center flex-col justify-center">
          <BookIcon className="size-16 text-muted-foreground mx-auto mb-4" />
          <p>This lesson does not have video</p>
        </div>
      );
    }
    return (
      <div className="aspect-video bg-black rounded-lg relative">
        <video
          className="w-full h-full object-cover"
          controls
          poster={thumbnailLink}
        >
          <source src={videoLink} type="video/mp4" />
          <source src={videoLink} type="video/webm" />
          <source src={videoLink} type="video/ogg" />
        </video>
      </div>
    );
  }
  function handleSubmit() {
    startTransittion(async () => {
      const { data: result, error } = await tryCatch(
        markCompleteLesson(data.id, data.Chapter?.Course?.slug as string)
      );
      if (error) {
        toast.error("Error");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") toast.error(result.message);
    });
  }
  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer
        thumbnailUrl={data.thumbnailUrl as string}
        videoUrl={data.videoUrl as string}
      />
      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant={"destructive"}
            onClick={handleSubmit}
            disabled={pending}
          >
            <CheckCircle className="size-4 mr-2 text-white" />
            Completed
          </Button>
        ) : (
          <Button
            variant={"destructive"}
            onClick={handleSubmit}
            disabled={pending}
          >
            <CheckCircle className="size-4 mr-2 text-white" />
            Mark as complete
          </Button>
        )}
      </div>
      <div>
        <h1>{data.title}</h1>

        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}
