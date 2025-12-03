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
import { chapterShema, ChapterShemaType } from "@/lib/zodShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { createChapter } from "../action";
import { toast } from "sonner";


export function NewChapterModal({ courseId }: { courseId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransaction] = useTransition();

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }


  const form = useForm<ChapterShemaType>({
    resolver: zodResolver(
      chapterShema
    ) as unknown as Resolver<ChapterShemaType>,
    defaultValues: {
      name: "",
      courseId: courseId,
    },
  });

  async function onSubmit(values:ChapterShemaType){
    startTransaction(async()=>{
        const { data: result, error } = await tryCatch(createChapter(values));

        if(error){
            toast.error(error.message);
            return;
        }
        if(result.status === "success"){
            toast.success(result.message);
            form.reset();
            setIsOpen(false);
        }else if(result.status === "error"){
            toast.error(result.message);
        }
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"default"} size={"sm"} className="gap-2">
          <Plus className="size-4" />
          Chương mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold capitalize">
            Tạo chương mới
          </DialogTitle>
          <DialogDescription>
            Bạn muốn đặt tên cho chương của mình là gì?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên chương</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tên chương - Ví dụ: Chương 1....."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {pending ? (
                <Button disabled type="submit">
                  <Loader2 className="animate-spin" /> Đang tạo....
                </Button>
              ) : (
                <Button disabled={pending} type="submit">
                  Tạo
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}