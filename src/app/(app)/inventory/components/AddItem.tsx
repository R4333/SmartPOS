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
  DialogClose,
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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ManualItem from "./ManualItem";

export default function AddItem() {
    const {toast} = useToast();
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [barcode, setBarcode] = useState<string>("");
    const [discount, setDiscount] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [csvData, setCsvData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [state, formAction] = useFormState(createItem, {
        error: "",                                                                                                                                                                     
    });  

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

    const handleDataInsertion = async ()=> {
        if(csvData.length === 0) {
            console.log(name)
            console.log(barcode)
            console.log(discount)
            console.log(quantity)
            console.log(price)
            console.log(category)
            console.log(image)
            console.log(description)
            const formData = new FormData();
            formData.append('barcode', barcode);
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', image);
            formData.append('userId', "sdas");
            formData.append('discount',discount);
            formData.append('tags', category);
            formData.append('quantity', quantity)
            formData.append('isAvailable', "true");
            await createItem(1, formData).then((t)=>{
                 if(t.success != undefined){
                 router.refresh()
                 toast({
                    title: `${name} have been added`,
                    description: "Friday, February 10, 2023 at 5:57 PM",
            })
                 }else{

                 toast({
                    variant: "destructive",
                    title: `Failed to add ${name}`,
                    description: "Check logs for more info",
            })

                 }


        })
    }

        else {csvData.map(async (d:any,i:any) => {
                const formData = new FormData();
                formData.append('barcode', d.barcode);
                formData.append('name', d.name);
                formData.append('price', d.price);
                formData.append('description', d.description);
                formData.append('image', d.image);
                formData.append('userId', "sdas");
                formData.append('discount', d.discount);
                formData.append('tags', d.tags);
                formData.append('quantity', d.quantity)
                formData.append('isAvailable', d.isAvailable);
                await createItem(1, formData).then((t)=>{
                if(t.success != undefined){
                     router.refresh()
                     toast({
                         title: `${name} have been added`,
                         description: "Friday, February 10, 2023 at 5:57 PM",
                     })

                }else{

                     toast({
                        variant: "destructive",
                        title: `Failed to add ${name}`,
                        description: "Check logs for more info",
                     })
                    return 0;
                  }
              
                })
        })
    }
    }

    function parseCsv(csvText:any) {
      const lines = csvText.trim().split('\n'); // Split text into lines
      const headers = lines.shift().split(','); // Remove and extract headers

      // Parse lines into objects
      const data = lines.map((line:any) => {
        const values = line.split(',');
        const obj:any = {};
        headers.forEach((header:any, index:any) => {
          obj[header.trim()] = values[index].trim();
        });
        return obj;
      });

      return data;
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary text-secondary"><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="">
      <Card className="w-[500px] h-[900px] border-0 bg-background">
      <CardContent className="p-0 h-[88%]">
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-9 mt-6">
            <h1 className="font-bold">Add via CSV</h1>
            <span className="text-sm text-muted-foreground mb-3">Make sure to have the same schema</span>
            <Input accept=".csv" type="file" onChange={handleFileUpload}/>
        </div>
        <h1 className="font-bold">Add Manually</h1>
        <span className="text-sm text-muted-foreground mb-3">Manually enter the entries</span>
        <div className="mt-3"/>
        <ManualItem setName={setName} setBarcode={setBarcode} setDiscount={setDiscount} setQuantity={setQuantity} setDescription={setDescription} setPrice={setPrice} setImage={setImage} setCategory={setCategory}/>
      </CardContent>
      <CardFooter className="flex justify-center">
      <DialogClose asChild>
        <Button className="w-36" onSubmit={handleDataInsertion} onClick={handleDataInsertion}>Add</Button>
      </DialogClose>
      </CardFooter>
    </Card>
      </DialogContent>
    </Dialog>
  )
}

