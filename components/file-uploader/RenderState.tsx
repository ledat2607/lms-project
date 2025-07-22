import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Progress } from "../ui/progress";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drop your file here or{" "}
        <span className="text-primary font-bold">click to upload</span>
      </p>
      <Button className="mt-4">Select File</Button>
    </div>
  );
}


export function RenderErrorState() {
  return (
    <div className="text-destructive text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full mb-4 bg-destructive/30 ">
        <ImageIcon className={cn("size-6 text-destructive mx-auto")} />
      </div>
      <p className="font-semibold text-base">
        Upload failed - Something went wrong
      </p>
      <Button className="mt-1" type="button">
        Retry
      </Button>
    </div>
  );
}

export function RenderUploadedState({ previewUrl, isDeleting, handleRemoveFile }: { previewUrl: string, isDeleting: boolean, handleRemoveFile: () => void }) {
  return (
    <div>
      <Image src={previewUrl} alt="uploaded " fill className="object-contain p-2" />
      <Button onClick={handleRemoveFile} disabled={isDeleting} variant={'destructive'} size={'icon'} className={cn("absolute top-4 right-4")}>
        {isDeleting ? (
          <Loader className="size-4 animate-spin" />
        ) : <XIcon className="size-4" />}
      </Button>
    </div>
  )
}

export function RenderUploadingState({ progress, file }: { progress: number, file: File }) {

  return <div className="text-center flex justify-center items-center flex-col">
    <div className="w-full h-40 bg-muted animate-pulse rounded-md mb-4" />

    {/* Progress label */}
    <p className="text-sm text-foreground mb-2">{progress}% uploaded</p>

    {/* Progress bar */}
    <Progress
      value={progress}
      className="w-full h-2 bg-muted-foreground/20"
    />
    <p className="mt-1 text-xs text-muted-foreground truncate max-w-sm">{file.name}</p>
  </div>
}