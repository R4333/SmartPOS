import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ItemCard from "./ItemCard"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function CategoryTab(){
    const tags = Array.from({ length: 5 }).map(
  (_, i, a) => <ItemCard key={i} name="Lemonade"/>
)
    return (
    <Tabs defaultValue="snacks" className="w-11/12">
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
            <ScrollArea className="h-[50rem] w-9/12 rounded-md border mt-9 mb-3">
                <div className="p-4 flex flex-row">
                    {tags.map((tag, index) => (
                        <>
                            <div key={index} className="text-sm">
                                {tag}
                            </div>
                        </>
                    ))}
                </div>
                <div className="p-4 flex flex-row">
                    {tags.map((tag, index) => (
                        <>
                            <div key={index} className="text-sm">
                                {tag}
                            </div>
                        </>
                    ))}
                </div>
                <div className="p-4 flex flex-row">
                    {tags.map((tag, index) => (
                        <>
                            <div key={index} className="text-sm">
                                {tag}
                            </div>
                        </>
                    ))}
                </div>
                <div className="p-4 flex flex-row">
                    {tags.map((tag, index) => (
                        <>
                            <div key={index} className="text-sm">
                                {tag}
                            </div>
                        </>
                    ))}
                </div>
            </ScrollArea>
        </TabsContent>
        <TabsContent value="beverages">
            <ScrollArea className="h-[50rem] w-9/12 rounded-md border mt-9 mb-3">
                <div className="p-4 flex flex-row">
                    {tags.map((tag, index) => (
                        <>
                            <div key={index} className="text-sm">
                                {tag}
                            </div>
                        </>
                    ))}
                </div>
                <div className="p-4 flex flex-row">
                    {tags.map((tag, index) => (
                        <>
                            <div key={index} className="text-sm">
                                {tag}
                            </div>
                        </>
                    ))}
                </div>
                <div className="p-4 flex flex-row">
                    {tags.map((tag, index) => (
                        <>
                            <div key={index} className="text-sm">
                                {tag}
                            </div>
                        </>
                    ))}
                </div>
                <div className="p-4 flex flex-row">
                    {tags.map((tag, index) => (
                        <>
                            <div key={index} className="text-sm">
                                {tag}
                            </div>
                        </>
                    ))}
                </div>
            </ScrollArea>
 
        </TabsContent>
        <TabsContent value="dairy">Dairy</TabsContent>
        <TabsContent value="bakery">Make changes to your account here.</TabsContent>

    </Tabs>

    )
}
