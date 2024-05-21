"use client"

import Link from "next/link"
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { useEffect, useState } from "react"

export default function Dashboard() {

  const [data, setData] = useState<object[]>([]);
  const [data2, setData2] = useState<object[]>([]);

  useEffect(()=>{

    async function getItems(){
        const response = await fetch('/api/sales', {cache: 'no-store'})
        const data = await response.json();
        setData(data['product'])
    }

    async function getItems2(){
        const response2 = await fetch('/api/saleitem', {cache: 'no-store'})
        const d2 = await response2.json();
        const combinedSales: any[]= []
        d2['product'].forEach((sale:any) => {

            const existingSale = combinedSales.find(item => item.saleId === sale.saleId);

            if (!existingSale) {
                combinedSales.push({
                    saleId: sale.saleId,
                    total: sale.total,
                    items: [sale.itemName]
                });
            } else {
                existingSale.items.push(sale.itemName);
            }
        });

        setData2(combinedSales)
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
          <Card className="h-[900px] xl:col-span-2 flex flex-col" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Sales</CardTitle>
                <CardDescription>
                  All sales from your store.
                </CardDescription>
              </div>
            </CardHeader>
            <ScrollArea>
            <CardContent className="">
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
            </ScrollArea>
          </Card>
          <Card  x-chunk="dashboard-01-chunk-5" className="h-[700px] overflow-y-hidden">
            <CardHeader>
              <CardTitle className="mb-6">Recent Sales</CardTitle>
                 <CardDescription className="mb-9">
                  All the recent sales from your store.
                </CardDescription>

            </CardHeader>
            <CardContent className="grid gap-8">
            <Accordion type="single" collapsible className="w-full">
               { 
                    data2.map((d:any, i:any) => {
                        return (
                                  <div key={d.saleId} className="flex justify-between">
                                  <AccordionItem className="border-0" value={d.saleId}>
                                    <AccordionTrigger># {d.saleId}</AccordionTrigger>
                                    <AccordionContent>
                                     {
                                        d["items"].map((i:any) => {
                                            return(
                                                <p key={i} className="text-sm text-muted-foreground">{`${i}      x 1`}</p>
                                            )
                                        })
                                    } 
                                    </AccordionContent>
                                  </AccordionItem>
                                  <div className="mt-5 font-medium">${d.total}</div>
                                  </div>
                        )
                    })
              }
             </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

