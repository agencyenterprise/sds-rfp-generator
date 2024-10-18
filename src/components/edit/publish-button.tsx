"use client";

import { CloudArrowUpIcon, CloudIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function PublishButton({
  id,
  publishedAt,
}: {
  id: string;
  publishedAt: Date | null;
}) {
  const router = useRouter();
  const publish = api.rfp.publish.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const unpublish = api.rfp.unpublish.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button
      variant="secondary"
      onClick={() =>
        publishedAt ? unpublish.mutate({ id }) : publish.mutate({ id })
      }
    >
      {publishedAt ? (
        <>
          <CloudIcon className="mr-2 size-4 text-primary" />
          Unpublish
        </>
      ) : (
        <>
          <CloudArrowUpIcon className="mr-2 size-4 text-primary" />
          Publish
        </>
      )}
    </Button>
  );
}
