import { Button } from "@/components/ui/button"

interface props{
  name: string;
}
const ItemCard: React.FC<props> = (props) =>  {
  return <Button variant="outline" className="h-[200px] w-[200px] ml-9">{props['name']}</Button>
}

export default ItemCard;

