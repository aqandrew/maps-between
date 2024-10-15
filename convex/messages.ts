import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
	args: {},
	handler: async (ctx) => await ctx.db.query('messages').collect(),
});

export const getForUser = query({
	args: { userId: v.string() },
	handler: (ctx, { userId }) => {
		return ctx.db
			.query('messages')
			.withIndex('byUserId', (q) => q.eq('userId', userId))
			.order('desc')
			.collect();
	},
});

export const add = mutation({
	args: {
		message: v.string(),
		location: v.object({
			lat: v.float64(),
			lng: v.float64(),
		}),
		pov: v.object({
			heading: v.float64(),
			pitch: v.float64(),
		}),
		placeName: v.string(),
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.db.insert('messages', args);
	},
});

export const remove = mutation({
	args: { id: v.id('messages') },
	handler: async (ctx, { id }) => {
		await ctx.db.delete(id);
	},
});
