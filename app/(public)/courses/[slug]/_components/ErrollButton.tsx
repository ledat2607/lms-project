'use client'

import { Button } from "@/components/ui/button"
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { errollCourse } from "../action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ErrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTrasition] = useTransition();

  
  function onSubmit() {
    startTrasition(async () => {
        const { data: result, error } = await tryCatch(errollCourse(courseId));

        if(error){
            toast.error("Failed");
        }
        if(result?.status === "success"){
            toast.success("Successfull");
        }
        else if (result?.status === 'error'){
            toast.error(result.message);
        }
    });
  }
  return (
    <Button onClick={onSubmit} className="w-full">
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" /> Loading....
        </>
      ) : (
        "Erroll now"
      )}
    </Button>
  );
}