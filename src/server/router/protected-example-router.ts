import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedExampleRouter = createProtectedRouter()
	.mutation("addToChain", {
		input: z.object({
			url: z.string(),
			notes: z.string().nullable(),
		}),
		async resolve({ input, ctx }) {
			console.log(input.url, input.notes, ctx.session.user.id);
			return await ctx.prisma.link.create({
				data: {
					url: input.url,
					notes: input.notes,
					userId: ctx.session.user.id as string,
				},
			});
		},
	})
	.query("getSecretMessage", {
		resolve({ ctx }) {
			return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
		},
	});
