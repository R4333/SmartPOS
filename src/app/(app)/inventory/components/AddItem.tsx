import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react';
import {createItem} from "@/lib/actions/pos"

export default function AddItem() {

    const formData = new FormData();

    formData.append('barcode', 'ELEC001');
    formData.append('name', 'Laptop');
    formData.append('price', '999.99');
    formData.append('description', 'Powerful laptop for work and entertainment.');
    formData.append('image', 'laptop_image_url');
    formData.append('userId', 'user_id_of_seller');
    formData.append('discount', '0.1');
    formData.append('tags', 'electronics, laptop, tech');
    formData.append('quantity', '50');
    formData.append('isAvailable', 'true');


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you`&apos`re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" >Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

