import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

export function RenderEmptyState({isDragActive}:{isDragActive:boolean}){
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


export function RenderErrorState(){
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