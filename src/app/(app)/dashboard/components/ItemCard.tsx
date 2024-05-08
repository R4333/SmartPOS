import { Button } from "@/components/ui/button"
import Image from 'next/image';
import pic from '@/images/orange1.png'


interface props{
  name: string;
  category: string;
  barcode: string;
}
const ItemCard: React.FC<props> = (props) =>  {
  return <Button variant="outline" className="h-[200px] w-[15%] ml-4 mb-3 justify-between flex flex-col">
  <div> {props['name']} </div>
  <span>{`Price $9.99`}</span>
  <Image src={pic} alt="chocolaty" width={50} height={50}/>

  </Button>
}

export default ItemCard;

