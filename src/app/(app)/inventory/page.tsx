"use client"
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
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import pic from '../../bg.png'
import AddItem from "./components/AddItem";


export default function Component() {
  const { toast } = useToast()

  return (
    <Card className="w-[97.5%] ml-5">
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
          <TableBody>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={pic}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                Laser Lemonade Machine
              </TableCell>
              <TableCell>
                <Badge variant="outline">Draft</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">$499.99</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
              </TableCell>
              <TableCell>
                <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost" className="bg-background border-2 border-secondary text-secondary-foreground">
                      <MoveHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <DialogTrigger>Edit</DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Button  onClick={() => console.log(toast({description: "Item successfully removed"}))}>
                        Delete 
                    </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                          </DialogDescription>
                    </DialogHeader>
                </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow> 
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing
          <strong>1-10</strong> of <strong>32</strong>
          products{"\n              "}
        </div>
      </CardFooter>
    </Card>
  );
}

function MoveHorizontalIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
