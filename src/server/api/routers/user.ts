import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          image: input.image,
        },
      });

      return user;
    }),
});
