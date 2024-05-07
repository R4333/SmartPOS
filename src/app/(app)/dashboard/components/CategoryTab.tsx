"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemCard from "./ItemCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Hash } from 'lucide-react';


interface SearchProps {
  value?: string;
}

const CategoryTab: React.FC<SearchProps> = ({value}) => {

    const [query, setQuery] = useState('');
    const [filteredData, setData] = useState<React.JSX.Element[]>([]);
    const categ = ["all", "snacks", "beverages"]
    const tags = Array.from({ length: 33 }).map(
        (_, i:any, a:any) =>{return <ItemCard key={i} name={`Lemonade ${i}`} category={i < 10 ? "snacks" : "beverages"}/>}
    )
        useEffect(()=> {
            setQuery(value ? value: "");
            setData(tags);

        }, [])

        useEffect(()=> {
            setQuery(value ? value: "");
        
        }, [value])

        useEffect(()=> {

            if(query != '')
            {
                const newTags = tags.filter((item) =>item.props.name.toLowerCase().includes(query.toLowerCase()))
                setData(newTags);
            }
            else setData(tags)
        }, [query])
 
            

        return (
    <Tabs defaultValue="snacks" className="w-[90%] mb-16 ml-3">
        <TabsList className="bg-muted border-[0.2px] w-full">
            <TabsTrigger value="all" className="w-36 text-md">All</TabsTrigger>
            <TabsTrigger value="snacks" className="w-36 text-md">Snacks</TabsTrigger>
            <TabsTrigger value="beverages" className=" w-36 text-md">Beverages</TabsTrigger>
            <TabsTrigger value="dairy" className=" w-36 text-md">Dairy</TabsTrigger>
            <TabsTrigger value="bakery" className=" w-36 text-md">Bakery</TabsTrigger>
            <TabsTrigger value="electronics" className=" w-36 text-md">Electronics</TabsTrigger>
            <TabsTrigger value="kitchen" className=" w-36 text-md">Kitchen</TabsTrigger>
            <TabsTrigger value="furniture" className=" w-36 text-md">Furniture</TabsTrigger>
            <TabsTrigger value="Meat" className=" w-36 text-md">Meat</TabsTrigger>
            <TabsTrigger value="pcare" className=" w-36 text-md">Care</TabsTrigger>
            <TabsTrigger value="clothes" className=" w-36 text-md">Clothes</TabsTrigger>
            <TabsTrigger value="herbs" className=" w-36 text-md">Herbs</TabsTrigger>
        </TabsList>
        <div className="relative w-[10%] mt-8"> 
            <Hash className="absolute right-1 bottom-2.5 w-6 h-5"/>
            <Input type="email" placeholder="Barcode" className="w-full"/>
        </div>
        <ScrollArea className="h-[45rem] max-w-[73%] w-auto rounded-md border mt-2 mb-3 pt-3">
            <>
            {
                categ.map( 
                    (category, i:any, a:any) => {
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
