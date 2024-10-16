import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getCurrentUser } from "~/server/use-cases/user";

export const userRouter = createTRPCRouter({
  getCurrent: publicProcedure.query(getCurrentUser),
});
