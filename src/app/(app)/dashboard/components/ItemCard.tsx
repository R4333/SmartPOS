import { Button } from "@/components/ui/button"
import Image from 'next/image';
import pic from '@/images/orange1.png'
import { BadgeCent } from "lucide-react";

interface props{
  name: string;
  category: string;
  barcode: string;
  price: string;
}
const ItemCard: React.FC<props> = (props) =>  {
  return <Button variant="outline" className="relative h-[200px] w-[15%] ml-4 mb-3 justify-between flex flex-col">
  <div className="absolute origin-bottom-left left-4 -top-2 -rotate-45 w-[40px] h-[40px]">
  <BadgeCent className="absolute"/>
  <span className="absolute text-[11px] top-7 -left-3">10% off</span>
  </div>
  <div> {props['name']} </div>
  <span>{`Price $${props['price']}`}</span>
  <Image src={pic} alt="chocolaty" width={50} height={50}/>

  </Button>
}

export default ItemCard;

