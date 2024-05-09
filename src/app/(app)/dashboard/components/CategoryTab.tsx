"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemCard from "./ItemCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Barcode} from 'lucide-react';


interface SearchProps {
  globalSearchValue?: string;
}

const CategoryTab: React.FC<SearchProps> = ({globalSearchValue}) => {

    const [query, setQuery] = useState('');
    const [items, setItems] = useState<any>([]);
    const [categ, setCateg] = useState<any>(["all"]);
    const [barcode, setBarcode] = useState<any>(null);
    const [filteredData, setData] = useState<React.JSX.Element[]>([]);

        useEffect(()=> {
            setQuery(globalSearchValue? globalSearchValue: "");

        async function getItems(){
            const response = await fetch('/api/inventory', {cache: 'no-store'})
            const data = await response.json();
            const newItemsArray:any[] = [];
            const newArray:any[] = ["all"];
            data['product'].map((t:any,i:any) => {
                (() => {
                    if (newArray.length === 0 || newArray[newArray.length - 1] !== t.tags[0]) {
                        newArray.push(t.tags[0])
                    }
                })()
                newItemsArray.push(<ItemCard key={i} name={t.name} barcode={t.barcode} price={t.price} category={t.tags[0]}/>)
            })
            setData(newItemsArray)
            setItems(newItemsArray)
            setCateg(newArray)
        }

        getItems()

        }, [])

        useEffect(()=> {
            setQuery(globalSearchValue? globalSearchValue: "");
        
        }, [globalSearchValue])

        useEffect(()=> {

            if(query != '')
            {
                const newTags = items.filter((item:any) =>item.props.name.toLowerCase().includes(query.toLowerCase()))
                setData(newTags);
            }
            else setData(items)
        }, [query])
 
            

        return (
    <Tabs defaultValue="all" className="w-[90%] mb-16 ml-3 mt-9 focus:bg-background focus-visible:bg-background">
        <TabsList className="bg-muted border-[0.2px] w-full bg-secondary ">
            <TabsTrigger value="all" className="w-36 text-md focus:bg-background focus-visible:bg-background">All</TabsTrigger>
            <TabsTrigger value="snacks" className="w-36 text-md focus:bg-background focus-visible:bg-background">Snacks</TabsTrigger>
            <TabsTrigger value="beverage" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Beverages</TabsTrigger>
            <TabsTrigger value="dairy" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Dairy</TabsTrigger>
            <TabsTrigger value="bakery" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Bakery</TabsTrigger>
            <TabsTrigger value="electronics" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Electronics</TabsTrigger>
            <TabsTrigger value="kitchen" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Kitchen</TabsTrigger>
            <TabsTrigger value="furniture" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Furniture</TabsTrigger>
            <TabsTrigger value="Meat" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Meat</TabsTrigger>
            <TabsTrigger value="pcare" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Care</TabsTrigger>
            <TabsTrigger value="clothes" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Clothes</TabsTrigger>
            <TabsTrigger value="herbs" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Herbs</TabsTrigger>
        </TabsList>
        <div className="relative w-[10%] mt-8 ml-2"> 
            <Barcode className="absolute right-1.5 bottom-2.5 w-6 h-5 text-muted-foreground"/>
            <Input type="text" placeholder="Barcode" onSubmit={(e)=>setBarcode(e.target)} className="w-full bg-secondary"/>
        </div>
        <ScrollArea className="h-[45rem] max-w-[73%] w-auto rounded-md border mt-2 mb-3 pt-3 bg-secondary">
            <>

            {
                categ.map( 
                    (category:any, i:any, a:any) => {
                        return(
                            <TabsContent key={i} value={category}>
                            <div className="flex flex-row flex-wrap items-center">
                                {filteredData.map((tag:any, index:any) => {
                                    if(category === "all") return (tag)
                                    return tag.props.category == category ? (tag) : null
                                    })}
                            </div>
                            </TabsContent>
                        )
                    }
                )
            }
            </>
       </ScrollArea>
   </Tabs>

    )
}

export default CategoryTab;
