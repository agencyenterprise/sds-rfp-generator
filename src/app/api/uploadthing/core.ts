import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getCurrentUser } from "~/server/use-cases/user";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    pdf: { maxFileSize: "4MB" },
  })
    .middleware(async () => {
      const user = await getCurrentUser();
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
