import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateRFP } from "~/server/use-cases/generate-rfp";
import {
  createRFP,
  getRFPById,
  listPublishedRFPs,
  publishRFP,
  unpublishRFP,
  updateRFP,
} from "~/server/use-cases/rfp";
import {
  CreateRFPInput,
  GenerateRFPInput,
  ListRFPsInput,
  RFPIdInput,
  UpdateRFPInput,
} from "~/validators/rfp";

export const rfpRouter = createTRPCRouter({
  generate: publicProcedure
    .input(GenerateRFPInput)
    .mutation(async ({ input }) => generateRFP(input)),
  create: publicProcedure
    .input(CreateRFPInput)
    .mutation(async ({ input }) => createRFP(input)),
  get: publicProcedure
    .input(RFPIdInput)
    .query(async ({ input }) => getRFPById(input.id)),
  update: publicProcedure
    .input(UpdateRFPInput)
    .mutation(async ({ input }) => updateRFP(input)),
  list: publicProcedure
    .input(ListRFPsInput)
    .query(async ({ input }) =>
      listPublishedRFPs(input.searchTerm, input.page, input.pageSize),
    ),
  publish: publicProcedure
    .input(RFPIdInput)
    .mutation(async ({ input }) => publishRFP(input.id)),
  unpublish: publicProcedure
    .input(RFPIdInput)
    .mutation(async ({ input }) => unpublishRFP(input.id)),
});
