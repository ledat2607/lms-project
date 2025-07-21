"use client";

import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderEmptyState, RenderErrorState } from "./RenderState";
import { toast } from "sonner";
import { uuidv4 } from "uuid";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

export function Uploader() {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    id: null,
  });

  function uploadFile(file:File){
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles.length > 0 ){
        const file = acceptedFiles[0];

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
        });
    }
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: rejectFiles,
  });

  function rejectFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooMany = fileRejection.find(
        (rejection) => (rejection.errors[0].code = "too-many-files")
      );
      const fileSizeTooLarge = fileRejection.find(
        (rejection) => (rejection.errors[0].code = "file-too-large")
      );

      if (fileSizeTooLarge) {
        toast.error("File size exceed the limit");
      }

      if (tooMany) {
        toast.error("Too many files selected, only one");
      }
    }
  }
  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2  border-dashed transition-colors duration-300 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/30 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full px-4">
        <input {...getInputProps()} />
        {/* <RenderEmptyState isDragActive={isDragActive} /> */}
        <RenderErrorState />
      </CardContent>
    </Card>
  );
}
