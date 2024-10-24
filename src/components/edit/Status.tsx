"use client";

import { api } from "~/trpc/react";

export function Status({ id }: { id: string }) {
  const { data: rfp } = api.rfp.get.useQuery({ id });
  const isPublished = Boolean(rfp?.publishedAt);

  return <div>{isPublished ? "Published" : "Draft"}</div>;
}
