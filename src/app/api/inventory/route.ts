import { db } from "@/lib/db/index";

import {
  itemTable,
} from "@/lib/db/schema/pos";


export async function GET(request: Request) {
   const product = await db.select().from(itemTable);
 
  return Response.json({ product })
}
