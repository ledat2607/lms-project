'use client'

import { Resolver } from "react-hook-form";
import { CategoryCourses, CourseLevel, courseSchemas, CourseSchemasType, courseStatus } from "@/lib/zodShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { Loader2, PlusCircle, SparkleIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Uploader } from "@/components/file-uploader/Uploader";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import { editCourse } from "../action";
import { AdminCourseSignleType } from "@/app/data/admin/admin-get-course";

interface iAppProps{
    data: AdminCourseSignleType;
}

export function EditCourseComponent({ data }: iAppProps) {

    const [isPending, startTransaction] = useTransition();

    const router = useRouter();

    const form = useForm<CourseSchemasType>({
        resolver: zodResolver(
            courseSchemas
        ) as unknown as Resolver<CourseSchemasType>,
        defaultValues: {
            title: data.title,
            description: data.description,
            fileKey: data.fileKey,
            price: data.price,
            duration: data.duration,
            level: data.level,
            category: data.category as CourseSchemasType['category'],
            smallDescription: data.smallDescription,
            slug: data.slug,
            status: data.status,
        },
    });

    //2 function Submit
    function onSubmit(values: CourseSchemasType) {
        startTransaction(async () => {
            const { data: result, error } = await tryCatch(editCourse(values, data.id));

            if (error) {
                toast.error("An unexpected error occured. Please try again later!");
                return;
            }
            if (result.status === "success") {
                toast.success(result.message);
                form.reset();
                router.push("/admin/courses");
            } else if (result.status === "error") {
                toast.error(result.message);
            }
        });
    }
    return (
      <>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/*Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title your course...." {...field} />
                  </FormControl>
                  <FormMessage className="dark:text-white" />
                </FormItem>
              )}
            />

            {/*Slug - Create slug*/}
            <div className="flex gap-4 items-end">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Slug your course...." {...field} />
                    </FormControl>
                    <FormMessage className="dark:text-white" />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                className="w-fit"
                onClick={() => {
                  const titleValue = form.getValues("title");
                  const slug = slugify(titleValue);

                  form.setValue("slug", slug, { shouldValidate: true });
                }}
              >
                Generate slug <SparkleIcon className="ml-2" size={4} />
              </Button>
            </div>

            {/*Small Description */}
            <FormField
              control={form.control}
              name="smallDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Smaill Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[120px]"
                      placeholder="Short description your course...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="dark:text-white" />
                </FormItem>
              )}
            />

            {/*Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor field={field} />
                  </FormControl>
                  <FormMessage className="dark:text-white" />
                </FormItem>
              )}
            />

            {/*Filekey - Thumbnail */}
            <FormField
              control={form.control}
              name="fileKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail Image</FormLabel>
                  <FormControl>
                    <Uploader
                      onChange={field.onChange}
                      value={field.value}
                      fileAccepted="image"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-white" />
                </FormItem>
              )}
            />

            {/*Category */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please choose Course's category...." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CategoryCourses.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage className="dark:text-white" />
                  </FormItem>
                )}
              />
              {/*level */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Please choose Course's level...." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CourseLevel.map((lv) => (
                          <SelectItem key={lv} value={lv}>
                            {lv}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage className="dark:text-white" />
                  </FormItem>
                )}
              />

              {/*Duration */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration Time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Duration time (hours)....."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-white" />
                  </FormItem>
                )}
              />
              {/*Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Course Price ....."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-white" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please choose Course's status...." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseStatus.map((stt) => (
                        <SelectItem key={stt} value={stt}>
                          {stt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="dark:text-white" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  Updating...
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                <>
                  Update Course <PlusCircle className="ml-1" size={4} />
                </>
              )}
            </Button>
          </form>
        </Form>
      </>
    );
}