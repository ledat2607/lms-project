import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { chapterShema, ChapterShemaType, lessonSchema, LessonShemaType } from "@/lib/zodShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { createLesson } from "../action";
import { toast } from "sonner";


export function NewLessonsModal({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransaction] = useTransition();

  function handleOpenChange(open: boolean) {

    if(!open){
     form.reset();
    }

    setIsOpen(open);
  }

  const form = useForm<LessonShemaType>({
    resolver: zodResolver(lessonSchema) as unknown as Resolver<LessonShemaType>,
    defaultValues: {
      name: "",
      courseId: courseId,
      chapterId: chapterId,
      description: "",
    },
  });

  async function onSubmit(values: LessonShemaType) {
    console.log(values);
    startTransaction(async () => {
      const { data: result, error } = await tryCatch(createLesson(values));

      if (error) {
        toast.error(error.message);
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        setIsOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          size={"sm"}
          className="gap-2 w-full justify-center mt-6"
        >
          <Plus className="size-4" />
          New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold capitalize">
            Create new lesson for chapter
          </DialogTitle>
          <DialogDescription>
            What would you like to title your lesson ?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Lesson title - Ex: Lesson 1....."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              {pending ? (
                <Button type="submit">
                  <Loader2 className="animate-spin" /> Creating....
                </Button>
              ) : (
                <Button disabled={pending} type="submit">
                  Create Lesson
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}