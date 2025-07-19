import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage(){
    return (
      <>
        <div className="flex justify-between">
          <Link
            href={"/admin/courses"}
            className="flex items-center gap-4 hover:-translate-x-3 duration-300 ease-in-out"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <h1 className="font-bold capitalize text-primary">Create Course</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Basic Infomation</CardTitle>
            <CardDescription className="!px-0">
              Provide basic infomation for your course
            </CardDescription>
          </CardHeader>
        </Card>
      </>
    );
}