import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('notes'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { posts };
