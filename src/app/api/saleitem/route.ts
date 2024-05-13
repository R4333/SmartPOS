import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";

import {
  saleItemTable,
  itemTable,
  saleTable
} from "@/lib/db/schema/pos";


export async function GET(request: Request) {
   const product = await db.select().from(saleTable).leftJoin(saleItemTable, eq(saleTable.id, saleItemTable.saleId))
 
  return Response.json({ product })
}
