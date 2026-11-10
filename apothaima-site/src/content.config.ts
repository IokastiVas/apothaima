import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const draseis = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/draseis' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string().optional(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      type: z.string(),
      tag: z.enum(['aimodosia', 'allileggyi']),
      location: z.string(),
      partners: z.string().optional(),
      cover: image().optional(),
      gallery: z.array(image()).default([]),
      alt: z.string().optional(),
    }),
});

export const collections = { draseis };
