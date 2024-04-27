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
} from "drizzle-orm/pg-core";
import { createMany } from "drizzle-orm";

import { users } from "./auth";

export const item = pgTable("item", {
  id: serial("id").primaryKey(),
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
});

export const sale = pgTable("sale", {
  id: serial("id").primaryKey(),
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
  saleId: integer("sale_id")
    .notNull()
    .references(() => sale.id),
  itemId: integer("item_id")
    .notNull()
    .references(() => item.id),
});

//create a many to many table for sales and items
