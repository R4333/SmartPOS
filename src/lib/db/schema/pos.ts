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

  qunatity: bigint("quantity", { mode: "number" }).notNull(),

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

//create a many to many table for sales and items
