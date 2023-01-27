import { env } from "../../env/server.mjs";
import { createTRPCRouter, protectedProcedure } from "./trpc";
import nodemailer from "nodemailer";
import { z } from "zod";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  sendEmail: protectedProcedure
    .input(
      z.object({
        to: z.string().email(),
        cc: z.string().email(),
        subject: z.string(),
        text: z.string(),
        html: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const account = await ctx.prisma.account.findFirstOrThrow({
        where: {
          userId: ctx.session.user.id,
        },
      });

      const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: ctx.session.user.email,
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      await transport.sendMail({
        from: `${ctx.session.user.name} <${ctx.session.user.email}>`,
        to: input.to,
        cc: input.cc,
        subject: input.subject,
        text: input.text,
        html: input.html,
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
