"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Dropzone } from "~/components/edit/dropzone";
import { Button } from "~/components/ui/button";
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

  const handleUploadComplete = (fileUrl: string) => {
    createRFPMutation.mutate({ fileUrl });
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="space-y-8">
        <Button variant="secondary" asChild>
          <Link href="/listing">
            <ArrowLeftIcon className="mr-2 size-4 text-primary" />
            Back
          </Link>
        </Button>
        <header className="space-y-1.5">
          <h1 className="text-5xl font-medium text-white">Upload RFP File</h1>
          <p className="text-xl font-normal text-slate-400">
            Upload your RFP file to generate and publish
          </p>
        </header>
        <Dropzone onUploadComplete={handleUploadComplete} />
      </div>
    </div>
  );
}
