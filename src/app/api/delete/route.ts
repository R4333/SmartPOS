import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";


import {
  itemTable,
} from "@/lib/db/schema/pos";


export async function POST(request: Request) {
   const body = await request.json() as {barcode?:string}
   const res = await db.delete(itemTable).where(eq(itemTable.barcode, body.barcode));
 
  return Response.json({ res})
}
