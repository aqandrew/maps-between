import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const get = query({
	args: {},
	handler: async (ctx) => await ctx.db.query('messages').collect(),
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
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.db.insert('messages', args);
	},
});
