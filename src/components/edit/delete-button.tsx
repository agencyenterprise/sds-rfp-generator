"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const rfp = api.rfp.get.useQuery({ id });
  const deleteRFP = api.rfp.delete.useMutation({
    onSuccess: () => {
      router.push("/listing");
    },
  });
  const isPublished = Boolean(rfp.data?.publishedAt);

  if (isPublished) return null;

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => {
        if (confirm("Are you sure you want to delete this draft?")) {
          deleteRFP.mutate({ id });
        }
      }}
    >
      <TrashIcon className="mr-2 size-4 text-primary" />
      Delete Draft
    </Button>
  );
}
