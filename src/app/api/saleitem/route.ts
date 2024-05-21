import { db } from "@/lib/db/index";
import { eq, asc, desc } from "drizzle-orm";

import {
  saleItemTable,
  itemTable,
  saleTable
} from "@/lib/db/schema/pos";


export async function GET(request: Request) {
   const product = await db.select({
       saleId: saleTable.id,
       total: saleTable.total,
       itemName: itemTable.name,
   }).from(saleTable).leftJoin(saleItemTable, eq(saleTable.id, saleItemTable.saleId)).leftJoin(itemTable, eq(saleItemTable.itemId, itemTable.barcode)).orderBy(desc(saleTable.createdAt))
 
  return Response.json({ product })
}
