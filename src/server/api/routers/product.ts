import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Condition } from "@prisma/client";
import type { Product } from "@prisma/client";

const productSchema = z.object({
  title: z.string(),
  category: z.string(),
  image: z.string().url(),
  description: z.string(),
  price: z.number(),
  qty: z.number().int(),
  condition: z.nativeEnum(Condition),
  yearOfManufacture: z.number().int(),
  brand: z.string(),
  model: z.string(),
  dimensionL: z.number(),
  dimensionW: z.number(),
  dimensionH: z.number(),
  weight: z.number(),
  material: z.string(),
  color: z.string(),
  originalPackaging: z.boolean(),
  manualIncluded: z.boolean(),
  workingConditionDesc: z.string(),
});

export const productRouter = createTRPCRouter({
  addProducts: protectedProcedure
    .input(z.array(productSchema)) // array of products
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;
      if (!userId) {
        throw new Error("User ID is missing from session.");
      }

      // Ensure ctx.prisma.product is properly typed in your trpc context definition
      const result = await ctx.db.product.createMany({
        data: input.map((prod) => ({
          ...prod,
          userId: userId,
        })),
      });

      return { count: result.count };
    }),
  getProducts: protectedProcedure.query(async ({ ctx }): Promise<Product[]> => {
    const userId = ctx.session.user?.id;
    if (!userId) {
      throw new Error("User ID is missing from session.");
    }

    const products = await ctx.db.product.findMany({
      where: { userId },
    });

    return products;
  }),
  getListing: protectedProcedure.query(async ({ ctx }): Promise<Product[]> => {
    const userId = ctx.session.user?.id;
    if (!userId) {
      throw new Error("User ID is missing from session.");
    }

    const products = await ctx.db.product.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return products;
  }),
});
