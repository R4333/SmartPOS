"use client";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react';
import {createItem} from "@/lib/actions/pos"
import { useFormState } from "react-dom";
import { useState } from "react";

export default function AddItem() {

    const [state, formAction] = useFormState(createItem, {
        error: "",                                                                                                                                                                     
    });  
    const [csvData, setCsvData] = useState([]);

    const handleFileUpload = (event:any) => {
        const file = event.target.files[0]; // Get the first file from the FileList
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target ? e.target.result : "";
          const data = parseCsv(content);
          setCsvData(data);
        };

        reader.readAsText(file); // Read file as text
  };

    const parseCsv = (csvText:any) => {
        const lines = csvText.split('\n'); // Split text into lines
        const data = lines.map((line:any) => line.split(',')); // Split lines into arrays of values
        console.log(data);
        return data;
  };
    const formData = new FormData();

    formData.append('barcode', 'ELEC001');
    formData.append('name', 'Laptop');
    formData.append('price', '999.99');
    formData.append('description', 'Powerful laptop for work and entertainment.');
    formData.append('image', 'laptop_image_url');
    formData.append('userId', 'user_id_of_seller');
    formData.append('discount', '0.1');
    formData.append('tags', 'electronics laptop tech');
    formData.append('quantity', '50')
    formData.append('isAvailable', 'true');


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary text-secondary"><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <Card className="w-full border-0">
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-9 mt-3">
            <h1 className="font-bold">Add via CSV</h1>
            <span className="text-sm text-muted-foreground mb-3">Make sure to have the same schema</span>
            <Input accept=".csv" type="file" onChange={handleFileUpload}/>
        </div>
        <h1 className="font-bold">Add Manually</h1>
        <span className="text-sm text-muted-foreground">Manually enter the entries</span>
        <form>
          <div className="grid w-full items-center gap-4 mt-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Item Name</Label>
              <Input id="name" placeholder="Name of the item" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Price</Label>
              <Input id="price" placeholder="Price..." />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-36">Add</Button>
      </CardFooter>
    </Card>
      </DialogContent>
    </Dialog>
  )
}

