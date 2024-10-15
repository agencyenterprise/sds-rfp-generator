"use client";

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
      onClick={() =>
        publishedAt ? unpublish.mutate({ id }) : publish.mutate({ id })
      }
    >
      {publishedAt ? "Unpublish" : "Publish"}
    </Button>
  );
}
