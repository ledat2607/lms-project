"use client";

import { AdminLessonType } from "@/app/data/admin/get-lesson-adim";
import { Uploader } from "@/components/file-uploader/Uploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { lessonSchema, LessonShemaType } from "@/lib/zodShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm, Resolver } from "react-hook-form";
import { updateLesson } from "../action";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface iAppProps {
  data: AdminLessonType;
  chapterId: string;
  courseId: string;
}

export function LessonForm({ chapterId, data, courseId }: iAppProps) {
  const [pending, startTransaction] = useTransition();

  const form = useForm<LessonShemaType>({
    resolver: zodResolver(lessonSchema) as unknown as Resolver<LessonShemaType>,
    defaultValues: {
      name: data.title,
      description: data.description || "",
      thumbnailUrl: data.thumbnailUrl || "",
      videoUrl: data.videoUrl || "",
      chapterId: chapterId,
      courseId: courseId,
    },
  });
  async function onSubmit(values: LessonShemaType) {
    startTransaction(async () => {
      const { data: result, error } = await tryCatch(
        updateLesson(values, data.id)
      );

      if (error) {
        toast.error(error.message);
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        redirect(`/admin/courses/${courseId}/edit`);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <div>
      <Link
        href={`/admin/courses/${courseId}/edit`}
        className={buttonVariants({
          variant: "default",
          className: "hover:-translate-x-2 mb-6",
        })}
      >
        <ArrowLeft className="size-4" />
        <span>Trở lại</span>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize font-bold">
            Cấu hình bài học
          </CardTitle>
          <CardDescription className="!px-0">
            Cấu hình video, hình thu nhỏ và mô tả cho bài học
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {/*Name Title */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên bài học</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: Bài học 1....." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả bài học</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Thumbnail  */}
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình thu nhỏ</FormLabel>
                    <FormControl>
                      <Uploader
                        onChange={field.onChange}
                        value={field.value}
                        fileAccepted="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*Video url */}
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video</FormLabel>
                    <FormControl>
                      <Uploader
                        onChange={field.onChange}
                        value={field.value}
                        fileAccepted="video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {pending ? (
                <Button disabled={pending} type="submit">
                  <Loader2 className="size-4 animate-spin" />
                  Đang cập nhật...
                </Button>
              ) : (
                <Button type="submit">Lưu bài học</Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
