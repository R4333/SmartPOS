import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Copy,
  Plus,
  Minus,
} from "lucide-react"

import { ReloadIcon } from "@radix-ui/react-icons"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { generateKey } from "crypto"
import { useEffect, useState } from "react"
import { disconnect } from "process"
import {createSale} from '@/lib/actions/pos'
import { useToast } from "@/components/ui/use-toast"

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

function subTotal(items:any, quantity:any){

   const subTotal =  items.reduce((sum, item) => {
        const f = quantity[item.barcode];
        return sum + (item.price * f);
    }, 0)

    return subTotal.toFixed(2);


}

function calDiscount(discount:any){

   const totalDiscount = Object.values(discount).reduce((accumulator, currentValue:any) => parseFloat(accumulator) + parseFloat(currentValue), 0);
   return totalDiscount.toFixed(2);


}

const Cart: React.FC<Props> = ({itemInfo, setHandler})=> {

    const [unique, setUnique] = useState<string>("");
    const [items, setItems] = useState<Array<Object>>([]);
    const [quantity, setQuantity] = useState<Object>({});
    const [discount, setDiscount] = useState<Object>({}); 
    const [value, setValue] = useState("")
    const [flag, setFlag] = useState(true)
    const {toast} = useToast();

    const currentDateTime = new Date();


    useEffect(()=> {
        setUnique(generateUniqueString(7));
    },[])

    const handleIncrement= (event:React.ChangeEvent<HTMLInputElement>) => {
       const key = event.target.getAttribute('data-custom')
       console.log(event.target)
        const newObject = {...quantity};
        newObject[key] += 1.00;
        setQuantity(newObject)
    }

    const handleClear = () => {
        setDiscount({});
        items.map(item => setHandler && setHandler(item.barcode))
        setItems([]);
        setQuantity({});
    }

    const handleDecrement = (event:React.ChangeEvent<HTMLInputElement>) => {
       const barcode = event.target.getAttribute('data-custom')
       if(quantity[barcode] == 1) {

       const newObject = {...quantity};
       delete newObject[barcode];
       setQuantity(newObject);
       const newDiscount= {...discount};
       delete newDiscount[barcode];
       setDiscount(newDiscount);
       setItems(items.filter((item:any) => item.barcode!== barcode)) 
       setHandler && setHandler(barcode)

       }else{
        const newObject = {...quantity};
        newObject[barcode] -= 1.00;
        setQuantity(newObject)
       }
    }

    const handleSubmit = async (e:React.ChangeEvent<HTMLInputElement>) => {
        setFlag(false)
        e.preventDefault()
        const total = (subTotal(items, quantity) -  calDiscount(discount))
        const formData = new FormData();
        formData.append('total', total.toString())
        await createSale(formData, items, quantity).then((t)=> {
            console.log(t)
            setDiscount({});
            items.map(item => setHandler && setHandler(item.barcode))
            setItems([]);
            setQuantity({});
            toast({
                title: "Order completed successfully",
                description: "check logs for more info"
            })
            setFlag(true);
        })

    }

    useEffect(()=> {
        if(itemInfo.price !== undefined){
        setItems((prevArray:any) => [...prevArray, itemInfo])                
        const newObject = {...quantity};
        newObject[itemInfo.barcode] =  1.00;
        setQuantity(newObject)
        const newDiscount = {...discount};
        newDiscount[itemInfo.barcode] = itemInfo.discount; 
        setDiscount(newDiscount)
        }

    },[itemInfo])

     return(
    <div className="w-1/4">
            <Card className="overflow-hidden w-full h-[730px]" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    <span>Order# <span className="font-extralight">{unique}</span></span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: {currentDateTime.toISOString().slice(0,10)}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button onClick={handleClear} size="sm" variant="outline" className="h-8 gap-1">
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Clear
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ScrollArea className="h-36">
                  <ul className="grid gap-3 mt-3">
                     {itemInfo.price !== undefined ?
                         items.map((t:any, i:any) => { 
                                return (<li className="relative flex justify-between" key={t.barcode}>

                                  <span className="text-muted-foreground w-36 text-wrap">{t != null ? t.name: " "}</span>
                                  <div className="absolute left-40">
                                  <Button variant="outline" className="h-6 w-6 p-0 m-0 ml-4" datacustom={t.barcode} onClick={handleDecrement}>
                                  <Minus className="h-4 w-4"  data-custom={t.barcode}/>
                                  </Button>
                                  <span className="absolute left-9 top-1 ml-4">{quantity[t.barcode]}</span>
                                  <Button variant="outline" className="h-6 w-6 p-0 m-0 ml-8" data-custom={t.barcode} onClick={handleIncrement}>
                                  <Plus className="h-4 w-4" data-custom={t.barcode} />
                                  </Button>
                                  </div>
                                  <span className="ml-30">{`$${t != null ? (quantity[t.barcode]*t.price).toFixed(2) : " "}`}</span>
                                </li>)
                         }) : null
                     }
                  </ul>
                  </ScrollArea>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-muted-foreground flex items-center">
                        <span className="mb-6 mr-6">Promo Code:</span>
                        <div className="space-y-2">
                          <InputOTP
                            maxLength={6}
                            value={value}
                            onChange={(value) => setValue(value)}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                          <div className="text-center text-sm">
                            {value === "" ? (
                              <>Enter your promo code.</>
                            ) : (
                              <>You entered: <span className="text-primary">{value}</span></>
                            )}
                          </div>
                        </div>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subTotal(items, quantity)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span> <span className="font-bold text-muted-foreground">+</span> $0.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span><span className="font-bold text-muted-foreground">-</span> ${calDiscount(discount)}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span id="total">${(subTotal(items, quantity) -  calDiscount(discount))}</span>
                    </li>
                  </ul>
                </div>
              <Separator className="my-5" />
              <form className="flex justify-center" onSubmit={handleSubmit}>{flag ? <Button variant="outline">Process</Button>:<Button disabled><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>}</form>
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
