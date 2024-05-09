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
  return( <Button variant="outline" className="relative h-[200px] w-[18%] ml-4 mb-3 flex justify-between">
              <div className="absolute origin-bottom-left left-4 -top-2 -rotate-45 w-[40px] h-[40px]">
                    <BadgeCent className="absolute"/>
                    <span className="absolute text-[11px] top-7 -left-3">10% off</span>
              </div>
              <div className="pl-2 flex flex-col h-[80%] items-start justify-end">
                    <div className="mb-16 flex flex-col items-start text-wrap text-start"> {props['name']}

                    <span className="text-xs text-slate-400">{`#${props['barcode']}`}</span>
                    </div>
                    <span className="">{`$${props['price']}`}</span>
              </div>
              <Image src={pic} alt="chocolaty" width={70} height={90} className="self-end mb-6"/>
        </Button>
        )
}

export default ItemCard;

