import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2, Trash, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteChapter } from "../action";
import { toast } from "sonner";

export function DeleteChapter({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteChapter({ chapterId, courseId })
      );
      if (error) {
        toast.error(error.message);
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        setOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn chứ ?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn chương
            này
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          {pending ? (
            <Button onClick={handleDelete} disabled={pending}>
              <Loader2 className="animate-spin" /> Đang xóa
            </Button>
          ) : (
            <Button onClick={handleDelete}>
              <Trash />
              Xóa
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
