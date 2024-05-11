"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemCard from "./ItemCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Barcode} from 'lucide-react';
import Cart from "./Cart"


interface SearchProps {
  globalSearchValue?: string;
}
const CategoryTab: React.FC<SearchProps> = ({globalSearchValue}) => {

    const [query, setQuery] = useState('');
    const [items, setItems] = useState<any>([]);
    const [categ, setCateg] = useState<any>(["all"]);
    const [barcode, setBarcode] = useState<any>(null);
    const [filteredData, setData] = useState<React.JSX.Element[]>([]);
    const [itemObject, setItemObject] = useState<Object>({});
    const [disable, setDisable] = useState<boolean>(false);
    const handleClick = (value: Object)=> {
       setItemObject(value) 
    }

    const disableHandler = (value2?:string)=> { 
       setData(prevData => prevData.map(item => {
            if (item.key === value2) {
                return <ItemCard key={item.props.barcode} name={item.props.name} barcode={item.props.barcode} discount= {item.props.discount}price={item.props.price} category={item.props.category} onChange={handleClick} disable={true} setDisable={disableHandler}/>
            }
            return item;

       }));    

       setItems((prevData:any) => prevData.map((item:any) => {
            if (item.key === value2) {
                return <ItemCard key={item.props.barcode} name={item.props.name} barcode={item.props.barcode} discount= {item.props.discount} price={item.props.price} category={item.props.category} onChange={handleClick} disable={true} setDisable={disableHandler}/>
            }
            return item;

       }));    



    }
    const enableHandler = (value2?:string)=> {
        setData(prevData => prevData.map(item => {
            if (item.key === value2) {
                return <ItemCard key={item.props.barcode} name={item.props.name} barcode={item.props.barcode} discount= {item.props.discount} price={item.props.price} category={item.props.category} onChange={handleClick} disable={false} setDisable={disableHandler}/>
            }
            return item;
    }));    
        setItems((prevData:any) => prevData.map((item:any) => {
            if (item.key === value2) {
                return <ItemCard key={item.props.barcode} name={item.props.name} barcode={item.props.barcode} discount= {item.props.discount} price={item.props.price} category={item.props.category} onChange={handleClick} disable={false} setDisable={disableHandler}/>
            }
            return item;
    }));    




    }

    useEffect(()=> {
            setQuery(globalSearchValue? globalSearchValue: "");

        async function getItems(){
            const response = await fetch('/api/inventory', {cache: 'no-store'})
            const data = await response.json();
            const newItemsArray:any[] = [];
            const newArray:any[] = ["all"];
            data['product'].map((t:any,i:any) => {
                (() => {
                    if (newArray.length === 0 || !newArray.includes(t.tags[0])) {
                        newArray.push(t.tags[0])
                    }
                })()
                newItemsArray.push(<ItemCard key={t.barcode} name={t.name} barcode={t.barcode} price={t.price} discount= {t.discount} category={t.tags[0]} onChange={handleClick} disable={disable === true} setDisable={disableHandler}/>)
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
    <Tabs defaultValue="all" className="w-[95%] mb-16 ml-3 mt-9 focus:bg-background focus-visible:bg-background">
        <TabsList className="bg-muted border-[0.2px] w-[90%] bg-secondary ">
            <TabsTrigger value="all" className="w-36 text-md focus:bg-background focus-visible:bg-background">All</TabsTrigger>
            <TabsTrigger value="snacks" className="w-36 text-md focus:bg-background focus-visible:bg-background">Snacks</TabsTrigger>
            <TabsTrigger value="beverage" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Beverages</TabsTrigger>
            <TabsTrigger value="dairy" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Dairy</TabsTrigger>
            <TabsTrigger value="bakery" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Bakery</TabsTrigger>
            <TabsTrigger value="electronics" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Electronics</TabsTrigger>
            <TabsTrigger value="kitchen" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Kitchen</TabsTrigger>
            <TabsTrigger value="furniture" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Furniture</TabsTrigger>
            <TabsTrigger value="meat" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Meat</TabsTrigger>
            <TabsTrigger value="pscare" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Care</TabsTrigger>
            <TabsTrigger value="clothes" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Clothes</TabsTrigger>
            <TabsTrigger value="herbs" className=" w-36 text-md focus:bg-background focus-visible:bg-background">Herbs</TabsTrigger>
        </TabsList>
        <div className="relative w-[10%] mt-8 ml-2"> 
            <Barcode className="absolute right-1.5 bottom-2.5 w-6 h-5 text-muted-foreground"/>
            <Input type="text" placeholder="Barcode" onSubmit={(e)=>setBarcode(e.target)} className="w-full bg-secondary"/>
        </div>
        <div className="flex flex-row justify-between w-[100%]">
        <ScrollArea className="h-[45rem] min-w-[73%] w-[73%] rounded-md border mt-2 mb-3 pt-3 bg-secondary">
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
        <Cart itemInfo={itemObject} setHandler={enableHandler}/>
       </div>
   </Tabs>

    )
}

export default CategoryTab;
