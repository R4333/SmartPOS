"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

import { Separator } from "@/components/ui/separator"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Label } from "@/components/ui/label"


import { ReloadIcon } from "@radix-ui/react-icons"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"


export default function NewInventory() {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const router = useRouter();
  const {toast} = useToast();

  const [data, setData] = React.useState<any>([]);
  const [quantity, setQuantity] = React.useState<string>("");
  const [discount, setDiscount] = React.useState<string>("");

  React.useEffect(()=> {
    async function getItems(){
        const response = await fetch('/api/inventory', {cache: 'no-store'})
        const data = await response.json();
        setData(data['product'])
    }
    getItems()
  }, [])

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [flag, setFlag] = React.useState<boolean>(true);


  const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=> {
          setDiscount(e.target.value);
      }




 const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "isAvailable",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("isAvailable") ? "Available" : "Not Available"}</div>
    ),
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
    cell: ({ row }) => (
      <div className="capitalize text-slate-400">{row.getValue("barcode")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Name 
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tags")}</div>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <div className="capitalize ml-3">{row.getValue("discount")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className=" mr-3">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))

      // Format the price as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("createdAt")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {

      const initValues = () => {
          setQuantity(row.getValue('quantity'));
          setDiscount(row.getValue('discount'));
      }

      const handleSubmit = async (event:React.ChangeEvent<HTMLInputElement>) => {
        setFlag(false)
        toast({
            title: "Please Wait",
            description: "Your Item is being deleted"
        })
        event.preventDefault();
        const barcode = String(row.getValue("barcode"));
        try {
          const response = await fetch('/api/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({barcode: barcode}),
          });
          if (response.ok) {
            console.log('Post request successful');
            setData(data.filter((item:any)=> item.barcode !== barcode))
            toast({
                title:`${String(row.getValue("name"))} has been deleted`,
                description:"Friday, Febraury 10, 2023 at 5:37 PM"
            })
            setFlag(true);
          } else {
            console.error('Post request failed');
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })

          }
        } catch (error) {
          console.error('Error occurred while making the post request:', error);
           toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })


       }
      }

      return (
       
            <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8 p-0">
                      <DotsHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Separator />
                          <SheetTrigger className="w-full text-start">Edit</SheetTrigger>
                          <Sheet key={row.getValue('barcode')}>
                          <SheetContent side='right' className="">
                            <SheetHeader>
                              <SheetTitle>Edit {row.getValue('name')}</SheetTitle>
                              <SheetDescription>
                                You can edit individual columns here. 
                              </SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col">
                              <div className="flex flex-col mt-16">
                                <h1 className="mb-1"> Edit Quantity </h1>
                                <p className="mb-5 text-sm text-muted-foreground">Please enter the item quantity in decimals</p>
                                <Input id="quantity" onChange={(e)=>setQuantity(e.target.value)} placeholder={row.getValue('quantity')} className="w-24" />
                              </div>
                              <div className="flex flex-col mt-9">
                                <h1 className="mb-1"> Edit Discount</h1>
                                <p className="mb-5 text-sm text-muted-foreground">Please enter the discount in float</p>
                                <Input type="number" pattern="^\d+(\.\d{1,2})?$" id="discount" defaultValue={discount} onChange={handleInput} placeholder={row.getValue('discount')} className="w-24" />
                              </div>
                           </div>
                           <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                           </SheetClose>
                          </SheetContent>
                        </Sheet> 
                    <DropdownMenuItem>
                        <DialogTrigger>Delete</DialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent className="py-3">
                    <DialogHeader className="">
                        <DialogTitle className="mt-2">Are you absolutely sure?</DialogTitle>
                          <DialogDescription className="mt-2">
                            This action cannot be undone. This will permanently delete the item 
                            and remove it from the database.
                          </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                         Close 
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                          {flag ? <Button type="button" onClick={handleSubmit} variant="destructive">Yes</Button>
                          :<Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>}
                      </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
      )
    },
  },
]
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  return (
    <div className="w-full h-[350px]">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter items..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="h-[680px]">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
    </div>
    </div>
  )
}

