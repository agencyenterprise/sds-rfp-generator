import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";

import { useUploadThing } from "../ui/uploadthing";
import { Loading } from "./loading/loading";

export function Dropzone({
  onUploadComplete,
}: {
  onUploadComplete: (fileUrl: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload, routeConfig } = useUploadThing("fileUploader", {
    onClientUploadComplete: ([file]) => {
      const fileUrl = file?.url;
      if (!fileUrl) return;
      onUploadComplete(fileUrl);
    },
    onUploadBegin: () => {
      setIsUploading(true);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      void startUpload(acceptedFiles);
    },
    [startUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  if (isUploading) {
    return (
      <div className="flex h-[140px] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#393f58] bg-[#23283d] px-6 py-2">
        <Loading />
        <p className="text-sm text-slate-400">
          Uploading and processing your file, please wait, it might take a
          while...
        </p>
      </div>
    );
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex h-[140px] cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[#393f58] bg-[#23283d]">
        <DocumentTextIcon className="size-8 text-primary" />
        <div className="inline-flex items-center gap-1">
          <span className="text-sm font-semibold leading-tight text-[#2388ff]">
            Upload a file
          </span>
          <span className="text-sm font-normal leading-normal text-neutral-50">
            or drag and drop
          </span>
        </div>
        <span className="text-center text-xs font-normal leading-tight text-slate-500">
          PDF up to 10MB
        </span>
      </div>
    </div>
  );
}
