import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function CoursesPage(){
    return (
      <>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold uppercase">Your course</h1>
          <Link href={"/admin/courses/create"}>
            <Button variant={"default"}>
              <PlusCircle className="size-4" />
              Create course
            </Button>
          </Link>
        </div>
      </>
    );
}