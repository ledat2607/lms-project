"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,

  DraggableSyntheticListeners,
  rectIntersection,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,

  FileText,

} from "lucide-react";
import Link from "next/link";
import { AdminCourseSignleType } from "@/app/data/admin/admin-get-course";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { reorderChapter, reorderLessons } from "../action";
import { NewChapterModal } from "./NewChapterModal";
import { NewLessonsModal } from "./NewLessonModal";
import { DeleteLesson } from "./DeleteLesson";
import { DeleteChapter } from "./DeleteChapter";

interface iAppProps {
  data: AdminCourseSignleType;
}

interface SortableItemProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string;
  };
}

export function CourseConstructure({ data }: iAppProps) {
  const initialItems =
    data.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true,
      lessons: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];

  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems((prevItems) => {
      const updatedItem =
        data.chapter.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          order: chapter.position,
          isOpen:
            prevItems.find((item) => item.id === chapter.id)?.isOpen ?? true,
          lessons: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.position,
          })),
        })) || [];
      return updatedItem;
    });
  }, [data]);

  function SortableItem({ children, id, className, data }: SortableItemProps) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: id, data: data });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <ul>
        <li
          ref={setNodeRef}
          style={style}
          {...attributes}
          className={cn(
            "list-none touch-none",
            className,
            isDragging ? "z-0" : "z-0"
          )}
        >
          {children(listeners)}
        </li>
      </ul>
    );
  }

  const sensors = useSensors(useSensor(PointerSensor));

  function handleToggle(chapterId: string) {
    setItems((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, isOpen: !c.isOpen } : c))
    );
  }
/* eslint-disable @typescript-eslint/no-explicit-any */

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeIndex = active.id;
    const overIndex = over.id;
    const activeType = active.data.current?.type as "chapter" | "lesson";
    const overtype = over.data.current?.type as "chapter" | "lesson";
    const courseId = data.id;

    //Chapter re-order position
    if (activeType === "chapter") {
      let targetChapterId = null;

      if (overtype === "chapter") {
        targetChapterId = overIndex;
      } else if (overtype === "lesson") {
        targetChapterId = over.data.current?.chapterId ?? null;
      }
      if (!targetChapterId) {
        toast.error("Could not determine the chapter for recording");
        return;
      }
      const oldIndex = items.findIndex((item) => item.id === activeIndex);
      const newIndex = items.findIndex((item) => item.id === targetChapterId);

      if (oldIndex === -1 && newIndex === -1) {
        toast.error("Could not find chapter old/new index for recording");
        return;
      }
      const reorderdLocalChapter = arrayMove(items, oldIndex, newIndex);

      const updatedChapterForState = reorderdLocalChapter.map(
        (chapter, index) => ({
          ...chapter,
          order: index + 1,
        })
      );

      const previousItem = [...items];

      setItems(updatedChapterForState);

      if (courseId) {
        const chaptertoUpdate = updatedChapterForState.map((chapter) => ({
          id: chapter.id,
          position: chapter.order,
        }));
        const reOrderChapterPromise = () =>
          reorderChapter(courseId, chaptertoUpdate);

        toast.promise(reOrderChapterPromise(), {
          loading: "Re-ordering position chapter....",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItem);
            return "Failed to re-order";
          },
        });
        return;
      }
    }
    //Lesson re-order posintion
    if (activeType === "lesson" && overtype === "lesson") {
      const chapterId = active.data.current?.chapterId;
      const overChapterId = over.data.current?.chapterId;

      if (!chapterId || chapterId !== overChapterId) {
        toast.error(
          "Lesson move between different chapters or invalid chapter ID"
        );
        return;
      }
      const chapterIndex = items.findIndex(
        (chapter) => chapter.id === chapterId
      );
      if (chapterIndex === -1) {
        toast.error("Could not find chapter for lesson");
        return;
      }

      const chapterToUpdate = items[chapterIndex];
      const oldLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === activeIndex
      );
      const newLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === overIndex
      );
      if (oldLessonIndex === -1 || newLessonIndex === -1) {
        toast.error("Could not find lesson for recording");
        return;
      }
      const recordedLessons = arrayMove(
        chapterToUpdate.lessons,
        oldLessonIndex,
        newLessonIndex
      );

      const updatedLessonForState = recordedLessons.map((lesson, index) => ({
        ...lesson,
        order: index + 1,
      }));
      const newItems = [...items];

      newItems[chapterIndex] = {
        ...chapterToUpdate,
        lessons: updatedLessonForState,
      };

      const prevItems = [...items];

      setItems(newItems);

      if (courseId) {
        const lessonsToUpdate = updatedLessonForState.map((lesson) => ({
          id: lesson.id,
          position: lesson.order,
        }));
        const reorderLessonPromise = () =>
          reorderLessons(chapterId, lessonsToUpdate, courseId);

        toast.promise(reorderLessonPromise(), {
          loading: "Re-ordering position lessons....",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(prevItems);
            return "Failed to re-order";
          },
        });
      }
      return;
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <Card>
        <CardHeader className="border-b border-border flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold">Chapters</CardTitle>
          <NewChapterModal courseId={data.id} />
        </CardHeader>
        <div className="p-4 space-y-3">
          <SortableContext
            items={items.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((chapter) => (
              <SortableItem
                key={chapter.id}
                id={chapter.id}
                data={{ type: "chapter", chapterId: chapter.id }}
              >
                {(listeners) => (
                  <Card className="border border-muted">
                    <div className="flex items-center justify-between p-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        {/* DRAG HANDLE */}
                        <div
                          className="cursor-grab opacity-60 hover:opacity-100"
                          {...listeners}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GripVertical className="size-4" />
                        </div>

                        {/* TOGGLE */}
                        <Button
                          onClick={() => handleToggle(chapter.id)}
                          className="ml-2"
                          type="button"
                        >
                          {chapter.isOpen ? (
                            <ChevronDown className="size-5 transition-transform" />
                          ) : (
                            <ChevronRight className="size-5 transition-transform" />
                          )}
                        </Button>

                        {/* TITLE */}
                        <p
                          className="cursor-pointer hover:text-primary pl-2"
                          onClick={() => handleToggle(chapter.id)}
                        >
                          {chapter.title}
                        </p>
                      </div>

                      <div>
                        <DeleteChapter
                          courseId={data.id}
                          chapterId={chapter.id}
                        />
                      </div>
                    </div>

                    {chapter.isOpen && (
                      <div className="p-2">
                        {/* Lessons List */}
                        <SortableContext
                          items={chapter.lessons.map((l) => l.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          {chapter.lessons.map((lesson) => (
                            <SortableItem
                              key={lesson.id}
                              id={lesson.id}
                              data={{ type: "lesson", chapterId: chapter.id }}
                            >
                              {(lessonListeners) => (
                                <div className="flex items-center justify-between p-2 hover:bg-accent rounded-sm">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      {...lessonListeners}
                                    >
                                      <GripVertical className="size-4" />
                                    </Button>
                                    <FileText className="size-4" />
                                    <Link
                                      href={`/admin/courses/${data.id}/${chapter.id}/${lesson.id}`}
                                      className="hover:underline"
                                    >
                                      {lesson.title}
                                    </Link>
                                  </div>
                                  <DeleteLesson
                                    courseId={data.id}
                                    chapterId={chapter.id}
                                    lessonId={lesson.id}
                                  />
                                </div>
                              )}
                            </SortableItem>
                          ))}
                        </SortableContext>
                        <div className="pt-2">
                          <NewLessonsModal
                            chapterId={chapter.id}
                            courseId={data.id}
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </SortableItem>
            ))}
          </SortableContext>
        </div>
      </Card>
    </DndContext>
  );
}
