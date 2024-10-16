"use client";

import { useRouter } from "next/navigation";

import { UploadButton } from "~/components/ui/uploadthing";
import { api } from "~/trpc/react";

export default function CreatePage() {
  const router = useRouter();
  const createRFPMutation = api.rfp.create.useMutation({
    onSuccess: (result) => {
      router.push(`/edit/${result?.id}`);
    },
    onError: (error) => {
      alert(`ERROR! ${error.message}`);
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Upload RFP File</h1>
      {!createRFPMutation.isPending && (
        <UploadButton
          endpoint="fileUploader"
          onClientUploadComplete={([file]) => {
            const fileUrl = file?.url;
            if (!fileUrl) return;
            createRFPMutation.mutate({ fileUrl });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
      {createRFPMutation.isPending && <p>Generating your RFP...</p>}
    </div>
  );
}
