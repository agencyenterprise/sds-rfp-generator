import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  generateNewRFP,
  getRFPById,
  listPublishedRFPs,
  publishRFP,
  saveRFP,
} from "~/server/use-cases/rfp";
import { GenerateRFPInput, RFPIdInput, SaveRFPInput } from "~/validators/rfp";

export const rfpRouter = createTRPCRouter({
  list: publicProcedure.query(listPublishedRFPs),
  generate: publicProcedure
    .input(GenerateRFPInput)
    .mutation(async ({ input }) => generateNewRFP(input)),
  get: publicProcedure
    .input(RFPIdInput)
    .query(async ({ input }) => getRFPById(input.id)),
  save: publicProcedure
    .input(SaveRFPInput)
    .mutation(async ({ input }) => saveRFP(input)),
  publish: publicProcedure
    .input(RFPIdInput)
    .mutation(async ({ input }) => publishRFP(input.id)),
});
