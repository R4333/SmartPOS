import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
  Plus,
  Minus
} from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { generateKey } from "crypto"
import { useEffect, useState } from "react"


interface Props{
    itemInfo?: Object;
    setHandler?: (value:string | null) => void
}

function generateUniqueString(length:number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const Cart: React.FC<Props> = ({itemInfo, setHandler})=> {

    const [unique, setUnique] = useState<string>("");
    const [items, setItems] = useState<React.JSX.Element[]>([]);

    useEffect(()=> {
        setUnique(generateUniqueString(7));
    },[])

    const handleIncrement= (event:React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleDecrement = (event:React.ChangeEvent<HTMLInputElement>) => {
       const barcode = event.target.getAttribute('data-custom')
       const newArray:any[] = [];
       items.map((item) => {
        if(item.props.barcode !== barcode) newArray.push(item)
       })
       setItems(newArray)
       setHandler && setHandler(barcode)
    }

    useEffect(()=> {
        if(itemInfo.price !== undefined){
        let i = 0;
        setItems((prevArray:any) => [...prevArray, 
                <li className="flex" key={itemInfo.name}>
                      <Button variant="ghost" className="h-6 w-6 p-0 m-0 mr-4" data-custom={itemInfo.barcode} onClick={handleDecrement}>
                      <Minus className="h-4 w-4"  data-custom={itemInfo.barcode}/>
                      </Button>
                      <span className="text-muted-foreground">
                       {itemInfo != null ? itemInfo.name: " "} <span>2</span>
                      </span>
                      <Button variant="ghost" className="h-6 w-6 p-0 m-0 ml-4" data-custom={itemInfo.barcode} >
                      <Plus className="h-4 w-4" />
                      </Button>
                      <span className="ml-40">{`$${itemInfo != null ? itemInfo.price: " "}`}</span>
                </li>
        ])                
        }

    },[itemInfo])

     return(
    <div className="w-1/4">
            <Card className="overflow-hidden w-full h-[730px]" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order# {unique}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                  <ScrollArea className="h-36">
                     {itemInfo.price !== undefined ?
                      items.map((t:any, i:any) => {return t}) : null
                     }
                  </ScrollArea>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>Liam Johnson</span>
                      <span>1234 Main St.</span>
                      <span>Anytown, CA 12345</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      Same as shipping address
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+1 234 567 890</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Visa
                      </dt>
                      <dd>**** **** **** 4532</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
              </CardFooter>
            </Card>
    </div>
    )
}

export default Cart;
