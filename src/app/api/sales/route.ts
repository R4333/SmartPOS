import { db } from "@/lib/db/index";

import {
  saleTable,
} from "@/lib/db/schema/pos";


export async function GET(request: Request) {
   const product = await db.select().from(saleTable);
 
  return Response.json({ product })
}
