import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import {
  TableHead,
  TableRow,
  TableHeader,
  Table,
} from "@/components/ui/table";

import BodyTable from "./BodyTable";

import AddItem from "./AddItem";

import { ScrollArea } from "@/components/ui/scroll-area";



export default function CardComponent(){
return (
    <Card className="w-[97.5%] ml-5 pr-4 pl-4">
      <CardHeader className="pt-5">
        <CardTitle className="mb-4">Inventory</CardTitle>
        <CardDescription className="flex justify-between">
         Manage your items and their details 
          <div className="mr-9">
          <AddItem />
          </div>
        </CardDescription>
      </CardHeader>
      <ScrollArea className="h-[750px] w-full rounded-md border p-4">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <BodyTable />
        </Table>
      </CardContent>
      </ScrollArea>
      <CardFooter>
        <div className="text-xs text-muted-foreground mt-2">
          Showing
          <strong>1-10</strong> of <strong>32</strong>
          products{"\n              "}
        </div>
      </CardFooter>
    </Card>

)
}
