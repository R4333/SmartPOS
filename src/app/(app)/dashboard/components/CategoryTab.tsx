import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemCard from "./ItemCard"
import { ScrollArea } from "@/components/ui/scroll-area"

function Items(props:any){
        return (
            <ScrollArea className="h-[45rem] w-9/12 rounded-md border mt-9 mb-3">
                    {props.tags.map((tag:any, index:any) => (
                        <>
                            <div key={index} className="text-sm flex flex-row justify-center mb-3 mt-3">
                                {tag.map((t,i) => t)}
                            </div>
                        </>
                    ))}
            </ScrollArea>

        )
    }

export default function CategoryTab(){

    const tags = Array.from({ length: 10 }).map(
  (_, i, a) =>{
        const tags2 = Array.from({ length: 5 }).map(
        (_, i, a) => <ItemCard key={i} name={`Lemonade ${i}`}/>)

          return tags2;
      }
)
        return (
    <Tabs defaultValue="snacks" className="w-11/12 mb-16 ml-3">
        <TabsList className="bg-zinc-950 border-[0.2px] divide-x">
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
            <TabsTrigger value="ointments" className=" w-36 text-md">Ointments</TabsTrigger>
        </TabsList>
        <TabsContent value="snacks">
            <Items tags={tags}/>
        </TabsContent>
        <TabsContent value="beverages">
            <Items tags={tags}/>
        </TabsContent>
        <TabsContent value="dairy">
            <Items tags={tags}/>
        </TabsContent>
        <TabsContent value="bakery">
            <Items tags={tags}/>
        </TabsContent>
    </Tabs>

    )
}
