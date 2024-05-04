import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function CategoryTab(){
    return (
    <Tabs defaultValue="food" className="w-11/12">
        <TabsList className="bg-zinc-950 border-[0.2px] divide-x">
            <TabsTrigger value="snacks" className="w-36 text-md">Snacks</TabsTrigger>
            <TabsTrigger value="bevereges" className=" w-36 text-md">Bevereges</TabsTrigger>
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
    </Tabs>

    )
}
