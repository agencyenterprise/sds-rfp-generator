"use client";

import { CloudArrowUpIcon, CloudIcon } from "@heroicons/react/24/solid";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function PublishButton({ id }: { id: string }) {
  const utils = api.useUtils();
  const rfp = api.rfp.get.useQuery({ id });
  const publish = api.rfp.publish.useMutation({
    onSuccess: () => {
      void utils.rfp.get.invalidate({ id });
    },
  });
  const unpublish = api.rfp.unpublish.useMutation({
    onSuccess: () => {
      void utils.rfp.get.invalidate({ id });
    },
  });
  const isPublished = Boolean(rfp.data?.publishedAt);

  return (
    <Button
      variant="secondary"
      onClick={() =>
        isPublished ? unpublish.mutate({ id }) : publish.mutate({ id })
      }
    >
      {isPublished ? (
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
