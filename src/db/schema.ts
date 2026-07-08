import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  companyName: text('company_name'),
  subscriptionTier: text('subscription_tier').default('free'), // 'free', 'pro'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const testimonials = sqliteTable('testimonials', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  clientName: text('client_name'),
  clientCompany: text('client_company'),
  rawMediaUrl: text('raw_media_url'), // Cloudflare R2 bucket URL
  mediaType: text('media_type'), // 'video', 'audio', 'text'
  status: text('status').default('pending'), // 'pending', 'processing', 'ready', 'failed'
  processedContent: text('processed_content'), // The AI generated case study
  metricsExtracted: text('metrics_extracted'), // JSON string of metrics
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const widgets = sqliteTable('widgets', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  allowedDomain: text('allowed_domain'), // For CORS verification on the widget embed
  theme: text('theme').default('dark'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
