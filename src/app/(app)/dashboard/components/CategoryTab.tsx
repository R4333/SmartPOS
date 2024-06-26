"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemCard from "./ItemCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Barcode} from 'lucide-react';
import Cart from "./Cart"

interface SearchProps {
  globalSearchValue?: string;
}
const CategoryTab: React.FC<SearchProps> = ({globalSearchValue}) => {
    
    const inputRef = useRef(null);

    const [query, setQuery] = useState('');
    const [items, setItems] = useState<any>([]);
    const [categ, setCateg] = useState<any>(["all"]);
    const [barcode, setBarcode] = useState<string>("");
    const [filteredData, setData] = useState<React.JSX.Element[]>([]);
    const [itemObject, setItemObject] = useState<Object>({});
    const [disable, setDisable] = useState<boolean>(false);

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
                newItemsArray.push(<ItemCard key={t.barcode} name={t.name} barcode={t.barcode} price={t.price} discount= {t.discount} quantity={t.quantity} category={t.tags[0]} onChange={handleClick} disable={disable === true} setDisable={disableHandler}/>)
            })
            setData(newItemsArray)
            setItems(newItemsArray)
            setCateg(newArray)
        }

      useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            inputRef.current.focus();

          }
          else if(e.key === "Escape"){
              e.preventDefault()
              setBarcode("")
              inputRef.current.blur();
          }
        }
     
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
      }, [])
        const handleClick = (value: Object)=> {
           setItemObject(value) 
        }

    const disableHandler = (value2?:string)=> { 
       setData(prevData => prevData.map(item => {
            if (item.key === value2) {
                return <ItemCard key={item.props.barcode} name={item.props.name} barcode={item.props.barcode} quantity={item.props.quantity} discount= {item.props.discount} price={item.props.price} category={item.props.category} onChange={handleClick} disable={true} setDisable={disableHandler}/>
            }
            return item;

       }));    

       setItems((prevData:any) => prevData.map((item:any) => {
            if (item.key === value2) {
                return <ItemCard key={item.props.barcode} name={item.props.name} barcode={item.props.barcode} quantity={item.props.quantity} discount= {item.props.discount} price={item.props.price} category={item.props.category} onChange={handleClick} disable={true} setDisable={disableHandler}/>
            }
            return item;

       }));    



    }
    
    const handleBarcode = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault();
        setBarcode(event.target.value)
        console.log(barcode)
        const selectedItem = items.filter((item:any) => item.props.barcode.toLowerCase() == barcode.toLowerCase());
        console.log(selectedItem)
        if(selectedItem[0] != undefined && selectedItem[0].props.quantity > 0){
            if(selectedItem[0].props.disable != true){
                disableHandler(selectedItem[0].props.barcode)
                setItemObject(selectedItem[0].props)
            }
        }
        setBarcode("")
        inputRef.current.blur();


    }

    const handleChange= (event: React.ChangeEvent<HTMLInputElement>) => {
       if((event.target.value).length < 6) setBarcode(event.target.value)

    }

    const enableDecrementHandler = (value2?:string)=> {
        setData(prevData => prevData.map(item => {
            if (item.key === value2) {
                return <ItemCard key={item.props.barcode} name={item.props.name} quantity={item.props.quantity} barcode={item.props.barcode} discount= {item.props.discount} price={item.props.price} category={item.props.category} onChange={handleClick} disable={false} setDisable={disableHandler}/>
            }
            return item;
    }));    
        setItems((prevData:any) => prevData.map((item:any) => {
            if (item.key === value2) {
                return <ItemCard key={item.props.barcode} name={item.props.name} quantity={item.props.quantity} barcode={item.props.barcode} discount= {item.props.discount} price={item.props.price} category={item.props.category} onChange={handleClick} disable={false} setDisable={disableHandler}/>
            }
            return item;
    }));    
    }

    const enableHandler = async (value2?:string)=> {  
        console.log("Hello")

        setTimeout(async()=> {

            await getItems()

        },1500)
    }
 

    useEffect(()=> {

            setQuery(globalSearchValue? globalSearchValue: "");
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
            <form onSubmit={handleBarcode}><Input type="text" ref={inputRef} placeholder="Barcode" onChange={handleChange} value={barcode} pattern="[A-Za-z]{2}\d{3}" className="w-full bg-secondary" maxLength={5} /></form>
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
                                {filteredData.length != 0 ? filteredData.map((tag:any, index:any) => {
                                    if(category === "all") return (tag)
                                    return tag.props.category == category ? (tag) : null
                                    }): <div className="ml-[48%] mt-[25%]" >No Results</div>}
                            </div>
                            </TabsContent>
                        )
                    }
                )
            }
            </>
        </ScrollArea>
        <Cart itemInfo={itemObject} setHandler={enableHandler} setDecrementHandler={enableDecrementHandler}/>
       </div>
   </Tabs>

    )
}

export default CategoryTab;
