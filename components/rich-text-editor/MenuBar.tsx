import { type Editor } from "@tiptap/react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  ListIcon,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";

interface iAppProps {
  editor: Editor | null;
}

export function MenuBar({ editor }: iAppProps) {
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-input rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-4">
          {/*Bold */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  editor.isActive("bold") && "bg-muted text-foreground"
                )}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white font-bold rounded-2xl">
              Bold
            </TooltipContent>
          </Tooltip>

          {/*Italic */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={cn(
                  editor.isActive("italic") && "bg-muted text-foreground"
                )}
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Italic
            </TooltipContent>
          </Tooltip>

          {/*Strike */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={cn(
                  editor.isActive("strike") && "bg-muted text-foreground"
                )}
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white line-through rounded-2xl">
              Strike
            </TooltipContent>
          </Tooltip>

          {/*Heading 1 */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                  editor.isActive("heading") && "bg-muted text-foreground"
                )}
              >
                <Heading1 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Heading 1
            </TooltipContent>
          </Tooltip>

          {/*Heading 2 */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                  editor.isActive("heading") && "bg-muted text-foreground"
                )}
              >
                <Heading2 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Heading 2
            </TooltipContent>
          </Tooltip>

          {/*Heading 3 */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                  editor.isActive("heading") && "bg-muted text-foreground"
                )}
              >
                <Heading3 />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Heading 3
            </TooltipContent>
          </Tooltip>

          {/*BulletList */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                className={cn(
                  editor.isActive("bulletList") && "bg-muted text-foreground"
                )}
              >
                <ListIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Bullet List
            </TooltipContent>
          </Tooltip>

          {/*Ordered List */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive("orderedList", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                className={cn(
                  editor.isActive("orderedList") && "bg-muted text-foreground"
                )}
              >
                <ListOrdered />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Ordered List
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 mx-2 dark:bg-white bg-primary"></div>
        <div className="flex flex-wrap gap-4">
          {/*Left */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "left" }) &&
                    "bg-muted text-foreground"
                )}
              >
                <AlignLeft />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Align Left
            </TooltipContent>
          </Tooltip>

          {/*Center */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "center" }) &&
                    "bg-muted text-foreground"
                )}
              >
                <AlignCenter />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Align Center
            </TooltipContent>
          </Tooltip>
          {/*Right */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Toggle
                size={"sm"}
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={cn(
                  editor.isActive({ textAlign: "right" }) &&
                    "bg-muted text-foreground"
                )}
              >
                <AlignRight />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-2 text-white italic rounded-2xl">
              Align Right
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 mx-2 dark:bg-white bg-primary"></div>
        <div className="flex flex-wrap gap-4">
          {/*Undo */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Button
                size={"sm"}
                variant={"ghost"}
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo />
              </Button>
            </TooltipTrigger>
          </Tooltip>

          {/*Redo */}
          <Tooltip>
            <TooltipTrigger
              asChild
              className="border-2 border-primary dark:border-white"
            >
              <Button
                size={"sm"}
                variant={"ghost"}
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
