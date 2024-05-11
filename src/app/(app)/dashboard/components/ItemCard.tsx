import { Button } from "@/components/ui/button"
import Image from 'next/image';
import pic from '@/images/orange1.png'
import { BadgeCent } from "lucide-react";
import { useEffect, useState } from "react";

interface props{
  name: string;
  category: string;
  barcode: string;
  price: string;
  disable: boolean;
  discount: number;
  onChange?: (value: Object) => void;
  setDisable?: (value: string) => void;
}

const ItemCard: React.FC<props> = (props) =>  {

  const [d, setD] = useState<boolean>(false);
  
const handleClick = (event:React.ChangeEvent<HTMLInputElement>) => {
      const customData = JSON.parse(event.target.getAttribute('data-custom'));
      props.onChange && props.onChange(customData)
      props.setDisable && props.setDisable(customData.barcode)
      }


    return( <Button variant="outline" disabled={props.disable} data-custom={JSON.stringify(props)} onClick={handleClick} className="relative h-[200px] w-[18.5%] ml-4 mb-3 flex justify-between">
              <div className="absolute origin-bottom-left left-4 -top-2 -rotate-45 w-[40px] h-[40px]">
                    <BadgeCent className="absolute"/>
                    <span className="absolute text-[11px] top-7 -left-3">{props['discount']*100}% off</span>
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

