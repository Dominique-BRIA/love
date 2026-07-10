import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const loveDeclarations = pgTable('love_declarations', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  suitorName: text('suitor_name').notNull().default('Ton Admirateur'),
  recipientName: text('recipient_name').notNull().default('Divine'),
  loveLetter: text('love_letter').notNull(),
  rsvpAnswer: text('rsvp_answer'), // 'yes', 'soon', etc.
  divineReply: text('divine_reply'),
  divinePhoneOrInsta: text('divine_contact'),
  dateIdea: text('date_idea'),
  openedAt: timestamp('opened_at'),
  respondedAt: timestamp('responded_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const romanticMemories = pgTable('romantic_memories', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  date: text('date'),
  description: text('description').notNull(),
  tag: text('tag').default('Magique'),
  category: text('category').default('moment'), // 'moment', 'reason', 'dream'
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const loveMessages = pgTable('love_messages', {
  id: serial('id').primaryKey(),
  author: text('author').notNull(), // 'Divine' or 'Admirateur'
  message: text('message').notNull(),
  heartCount: integer('heart_count').default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Compatibility table for older /api/reponse routes that imported `loveResponses`.
// It keeps the Vercel build stable even if the deployed GitHub repo still contains
// that route, while the newer app uses `loveDeclarations` for RSVP data.
export const loveResponses = pgTable('love_responses', {
  id: serial('id').primaryKey(),
  prenom: text('prenom'),
  nom: text('nom'),
  name: text('name'),
  reponse: text('reponse'),
  response: text('response'),
  answer: text('answer'),
  message: text('message'),
  contact: text('contact'),
  phone: text('phone'),
  telephone: text('telephone'),
  instagram: text('instagram'),
  accepted: boolean('accepted').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
