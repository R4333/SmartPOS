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
import NewInventory from "./NewInventory";

import AddItem from "./AddItem";

import { ScrollArea } from "@/components/ui/scroll-area";



export default function CardComponent(){
return (
    <Card className="w-[97.5%] h-[98%] ml-5 px-4 bg-background border-0">
      <CardHeader className="pt-5">
        <CardTitle className="mb-4">Inventory</CardTitle>
        <CardDescription className="flex justify-between">
         Manage your items and their details 
          <div className="mr-9">
          <AddItem />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent> 
          {/*<BodyTable />*/}
          <NewInventory/>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground "/>
      </CardFooter>
    </Card>

)
}
