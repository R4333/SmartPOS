"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Argon2id } from "oslo/password";
import { lucia, validateRequest } from "../auth/lucia";
import { generateId } from "lucia";
import { eq, is, sql } from "drizzle-orm";
import { db } from "@/lib/db/index";

import {
  genericError,
  setAuthCookie,
  validateAuthFormData,
  getUserAuth,
} from "../auth/utils";
import { users, updateUserSchema } from "../db/schema/auth";

import {
  itemTable,
  saleTable,
  saleItemTable,
  createItemSchema,
  updateItemSchema,
  createSaleSchema,
  updateSaleSchema,
  createSaleItemSchema,
  updateSaleItemSchema,
} from "../db/schema/pos";

import { Item, Sale, SaleItem } from "../db/schema/pos";
import { number } from "zod";

interface ActionResult {
  error: string;
}

export async function signInAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData);
  if (error !== null) return { error };

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email.toLowerCase()));
    if (!existingUser) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      data.password
    );
    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setAuthCookie(sessionCookie);
  } catch (e) {
    console.log(e);
    return genericError;
  }

  return redirect("/dashboard");
}

export async function signUpAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData);

  if (error !== null) return { error };

  const hashedPassword = await new Argon2id().hash(data.password);
  const userId = generateId(15);

  try {
    await db.insert(users).values({
      id: userId,
      email: data.email,
      hashedPassword,
    });
  } catch (e) {
    return genericError;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  setAuthCookie(sessionCookie);
  return redirect("/dashboard");
}

export async function signOutAction(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  setAuthCookie(sessionCookie);
  redirect("/");
}

export async function updateUser(
  _: any,
  formData: FormData
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorised" };

  const name = formData.get("name") ?? undefined;
  const email = formData.get("email") ?? undefined;

  const result = updateUserSchema.safeParse({ name, email });

  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    if (error.name) return { error: "Invalid name - " + error.name[0] };
    if (error.email) return { error: "Invalid email - " + error.email[0] };
    return genericError;
  }

  try {
    await db
      .update(users)
      .set({ ...result.data })
      .where(eq(users.id, session.user.id));
    revalidatePath("/account");
    return { success: true, error: "" };
  } catch (e) {
    return genericError;
  }
}

// create item form data

export async function createItem(
  _: any,
  formData: FormData
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorised" };

  const name = formData.get("name") ?? undefined;
  const barcode = formData.get("barcode") ?? undefined;

  const prePrice = formData.get("price") as string;
  const price = parseInt(prePrice) ?? undefined;

  const description = formData.get("description") ?? undefined;
  const image = formData.get("image") ?? undefined;
  const preTags = formData.get("tags") as string;
  const tags = preTags.split(" ") ?? undefined;

  const preQuant = formData.get("quantity") as string;
  const quantity = parseInt(preQuant) ?? undefined;

  const preDiscount = formData.get("discount") as string;
  const discount = parseFloat(preDiscount) ?? undefined;

  const userId = "saada jee";

  const result = createItemSchema.safeParse({
    barcode,
    name,
    price,
    description,
    image,
    userId,
    discount,
    tags,
    quantity,
    isAvailable: true,
  });

  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    console.log(error);
    if (error.name) return { error: "Invalid name - " + error.name[0] };
    if (error.price) return { error: "Invalid price - " + error.price[0] };
    if (error.description)
      return { error: "Invalid description - " + error.description[0] };
    if (error.image) return { error: "Invalid image - " + error.image[0] };
    if (error.tags) return { error: "Invalid tags - " + error.tags[0] };
    if (error.quantity)
      return { error: "Invalid quantity - " + error.quantity[0] };
    if (error.discount)
      return { error: "Invalid discount - " + error.discount[0] };

    return genericError;
  }

  //generate numerical id for item through crypto random bytes

  const itemvals: Item = {
    barcode: result.data.barcode,
    name: result.data.name,
    price: result.data.price, // Convert price to string
    description: result.data.description,
    image: result.data.image,
    userId: session.user.id,
    discount: result.data.discount,
    tags: result.data.tags,
    quantity: result.data.quantity,
    isAvailable: result.data.isAvailable,
  };

  try {
    type NewUser = typeof itemTable.$inferInsert;

    const newUser: NewUser = {
      barcode: itemvals.barcode,
      name: itemvals.name,
      price: itemvals.price.toString(),
      description: itemvals.description,
      image: itemvals.image,
      userId: itemvals.userId,
      discount: String(itemvals.discount),
      tags: itemvals.tags,
      quantity: itemvals.quantity,
      isAvailable: itemvals.isAvailable,
    };

    console.log("trying for new User");
    await db.insert(itemTable).values(newUser);
    return { success: true, error: "Kutta" };
  } catch (e) {
    console.log("final error");
    return genericError;
  }
}

//create sale

export async function createSale(
  formData: FormData,
  items?: any,
  quantity?: any
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorised" };

  const preTotal = formData.get("total") as string;
  const total = parseFloat(preTotal) ?? undefined;

  const result = createSaleSchema.safeParse({
    id: generateId(15),
    userId: session.user.id,
    total,
  });

  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    if (error.total) return { error: "Invalid total - " + error.total[0] };
    return genericError;
  }

  const saleVals: Sale = {
    id: generateId(15),
    userId: result.data.userId,
    total: result.data.total,
  };

  try {
    type NewUser = typeof saleTable.$inferInsert;
    const newUser: NewUser = {
      id: saleVals.id,
      userId: saleVals.userId,
      total: String(saleVals.total),
    };

    type SaleItem = typeof saleItemTable.$inferInsert;

    await db.insert(saleTable).values(newUser);
    items.map(async (i: any) => {
      await db
        .update(itemTable)
        .set({ quantity: sql`${itemTable.quantity} - ${quantity[i.barcode]}` })
        .where(eq(itemTable.barcode, i.barcode));
      const sale_item: SaleItem = {
        saleId: saleVals.id,
        itemId: i.barcode,
      };
      await db.insert(saleItemTable).values(sale_item);
    });

    return { success: true, error: "" };
  } catch (e) {
    console.log(e);
    return genericError;
  }

  // try {
  //   await db.execute(
  //     sql`INSERT INTO sale (id, user_id, total) VALUES (${salevals.id}, ${saleVals.userId}, ${saleVals.total})`
  //   );
  //   return { success: true, error: "" };
  // } catch (e) {
  //   return genericError;
  // }
}

// update item

type ItemUpdate = {
  price?: number;
  discount?: number;
  quantity?: number;
};

export async function updateItem(
  _: any,
  formData: FormData
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorised" };

  const barcode = formData.get("barcode");

  // get item from db
  const [result] = await db
    .select()
    .from(itemTable)
    .where(eq(itemTable.barcode, barcode.toString()));

  const prePrice = formData.get("price") as string;

  // if value null or undefined then set to value from the db.
  const price = prePrice !== "" ? (prePrice) : result.price;

  const preQuant = formData.get("quantity") as string;
  const quantity = preQuant !== "" ?  parseInt(preQuant) : result.quantity;

  const preDiscount = formData.get("discount") as string;
  const discount = preDiscount !== "" ? parseFloat(preDiscount) : result.discount;

  const itemvals: ItemUpdate = {
    price: price, // Convert price to string
    discount: discount,
    quantity: quantity,
  };

  try {
    await db
      .update(itemTable)
      .set({
        price: itemvals.price?.toString(),
        discount: itemvals.discount?.toString(),
        quantity: itemvals.quantity,
      })
      .where(eq(itemTable.barcode, barcode.toString()));
    return { success: true, error: "" };
  } catch (e) {
    return genericError;
  }
}
