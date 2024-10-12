import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	messages: defineTable({
		location: v.object({
			lat: v.float64(),
			lng: v.float64(),
		}),
		pov: v.object({
			heading: v.float64(),
			pitch: v.float64(),
		}),
		message: v.string(),
		userId: v.string(),
	}),
});
