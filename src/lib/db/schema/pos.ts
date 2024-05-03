import { z } from "zod";
import {
  pgTable,
  timestamp,
  text,
  pgEnum,
  numeric,
  integer,
  serial,
  uuid,
  boolean,
  bigint,
  bigserial,
} from "drizzle-orm/pg-core";
import { createMany } from "drizzle-orm";

import { users } from "./auth";

export const item = pgTable("item", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  barcode: text("barcode").notNull().unique(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 100, scale: 2 }).notNull(),
  description: text("description"),
  image: text("image"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),

  discount: numeric("discount", { precision: 100, scale: 2 }).notNull(),

  tags: text("tags").array(),

  quantity: bigint("quantity", { mode: "number" }).notNull(),

  isAvailable: boolean("is_available").notNull().default(true),
});

export const sale = pgTable("sale", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  total: numeric("total", { precision: 100, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const saleItem = pgTable("sale_item", {
  saleId: bigint("sale_id", { mode: "number" })
    .notNull()
    .references(() => sale.id),
  itemId: bigint("item_id", { mode: "number" })
    .notNull()
    .references(() => item.id),
});

// create zod schema for item

export const createItemSchema = z.object({
  barcode: z.string(),
  name: z.string(),
  price: z.number().positive(),
  description: z.string().optional(),
  image: z.string().optional(),
  discount: z.number().positive(),
  tags: z.array(z.string()).optional(),
  quantity: z.number().positive(),
  isAvailable: z.boolean().optional(),
});

export const updateItemSchema = z.object({
  barcode: z.string().optional(),
  name: z.string().optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  discount: z.number().positive().optional(),
  tags: z.array(z.string()).optional(),
  quantity: z.number().positive().optional(),
  isAvailable: z.boolean().optional(),
});

// create zod schema for sale

export const createSaleSchema = z.object({
  userId: z.string(),
  total: z.number().positive(),
});

export const updateSaleSchema = z.object({
  userId: z.string().optional(),
  total: z.number().positive().optional(),
});

// create zod schema for saleItem

export const createSaleItemSchema = z.object({
  saleId: z.string(),
  itemId: z.string(),
});

export const updateSaleItemSchema = z.object({
  saleId: z.string().optional(),
  itemId: z.string().optional(),
});

export type Item = z.infer<typeof createItemSchema>;

export type Sale = z.infer<typeof createSaleSchema>;

export type SaleItem = z.infer<typeof createSaleItemSchema>;

export async function createItem(data: Item) {
  return createMany(item);
}
