import {
  Bird,
  Rabbit,
  Turtle,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Props{
    setName?: (value:string) => void,
    setBarcode?: (value:string) => void,
    setDiscount?: (value:string) => void,
    setPrice?: (value:string) => void,
    setQuantity?: (value:string) => void,
    setCategory?: (value:string) => void,
    setImage?: (value:string) => void,
    setDescription?: (value:string) => void,
}

const ManualItem: React.FC<Props> = ({setName, setBarcode, setDescription, setDiscount, setPrice, setQuantity, setImage, setCategory}) => {
    
    return(
    <form className="grid w-[500px] h-[600px] items-start gap-6 overflow-auto  pt-0">
                <fieldset className="grid gap-4 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Item
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Name</Label>
                    <Input id="name" type="text" onChange={(e)=>setName(e.target.value)} placeholder="name..." />
                  </div>
                  <div className="flex justify-between">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Barcode</Label>
                    <Input id="barcode" type="text" onChange={(e)=>setBarcode(e.target.value)} placeholder="BV001" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Discount</Label>
                    <Input id="discount" type="number" onChange={(e)=>setDiscount(e.target.value)} placeholder="0.1" />
                  </div>
                  </div>
                  <div className="flex justify-between">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Price</Label>
                    <Input id="price" type="number" onChange={(e)=>setPrice(e.target.value)} placeholder="0.7" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Quantity</Label>
                    <Input id="quantity" type="number" onChange={(e)=>setQuantity(e.target.value)} placeholder="20" />
                  </div>
                  </div>
                   <div className="grid gap-3">
                    <Label htmlFor="role">Category</Label>
                    <Select defaultValue="snacks" onValueChange={(e)=>setCategory(e)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="snacks">Snacks</SelectItem>
                        <SelectItem value="beverage">Beverage</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="bakery">Bakery</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="meat">Meat</SelectItem>
                        <SelectItem value="pscare">Personal Care</SelectItem>
                        <SelectItem value="clothes">Clothes</SelectItem>
                        <SelectItem value="herbs">Herbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Image</Label>
                    <Input id="image" type="file" onChange={(e)=>setImage(e.target.value)} placeholder="/coco.png" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Description</Label>
                    <Textarea id="content" onChange={(e)=>setDescription(e.target.value)} placeholder="You are my sunshine..." />
                  </div>
                </fieldset>
              </form>

    )
}

export default ManualItem;
