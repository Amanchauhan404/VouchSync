import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'd1', // Used for Cloudflare D1 in drizzle-kit v0.20.x
} satisfies Config;
