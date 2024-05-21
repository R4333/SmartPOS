"use client"

import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ScrollArea } from "@/components/ui/scroll-area"

import { useEffect, useState } from "react"

export default function Dashboard() {

  const [data, setData] = useState<object[]>([]);
  const [data2, setData2] = useState<object[]>([]);

  useEffect(()=>{

    async function getItems(){
        const response = await fetch('/api/sales', {cache: 'no-store'})
        const data = await response.json();
        setData(data['product'])
        console.log(data['product'])
    }

    async function getItems2(){
        const response2 = await fetch('/api/saleitem', {cache: 'no-store'})
        const data2 = await response2.json();
        setData2(data2['product'])
        console.log(data2['product'])
    }
    getItems()
    getItems2()

  },[])

  const handleSalesIncrease = ()=> {
        const currentDate = new Date();

        const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so adding 1
        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;

        const currentMonthObjects = data.filter(obj => new Date(obj.createdAt).getMonth() + 1 === currentMonth);
        const previousMonthObjects = data.filter(obj => new Date(obj.createdAt).getMonth() + 1 === previousMonth);

        const totalSalesCurrentMonth = currentMonthObjects.reduce((acc, obj) => acc + parseFloat(obj.total), 0);
        const totalSalesPreviousMonth = previousMonthObjects.reduce((acc, obj) => acc + parseFloat(obj.total), 0);


        const percentageIncrease = ((totalSalesCurrentMonth - totalSalesPreviousMonth)/totalSalesPreviousMonth) * 100;
        
        if(percentageIncrease === Infinity) return 100
        return percentageIncrease
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6">
        <div className="flex flex-col w-full items-star gap-4  md:gap-2 lg:gap-4 mt-9 ml-4">
            <h1 className="text-2xl font-semibold">Analytics</h1>
            <p className="text-sm text-muted-foreground">Analysis of the sales and profit data available on this page. </p>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 justify-center">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0 bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(data.reduce((acc, obj) => acc + parseFloat(obj.total), 0)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</div>
              <p className="text-xs text-muted-foreground">
                +{handleSalesIncrease()}% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{data.length}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Sales</CardTitle>
                <CardDescription>
                  All sales from your store.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sale ID</TableHead> 
                    <TableHead className="pl-20">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">

                  {
                      data.map((d:any) => {
                          return (
                                <TableRow key={d.id}>
                                    <TableCell>
                                      <div className="font-medium">#{d.id}</div>
                                      <div className="hidden text-sm text-muted-foreground md:inline">
                                     cashier: {d.userId}
                                      </div>
                                    </TableCell> 
                                    <TableCell className="">
                                      {d.createdAt}
                                    </TableCell>
                                    <TableCell className="text-right">${d.total}</TableCell>
                                </TableRow>

                          )
                      })
                  }
               </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card  x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle className="mb-6">Recent Sales</CardTitle>
                 <CardDescription className="mb-9">
                  All the recent sales from your store.
                </CardDescription>

            </CardHeader>
            <CardContent className="grid gap-8">
               { 
                data2.map((d:any) => {
                    return (
              <div key={d.sale.id + d.sale.updatedAt} className="flex items-center gap-4">
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {d.sale.id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                            {JSON.stringify(d['sale_item'])}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">${d.sale.total}</div>
                </div>
                    )
                })
               }
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

