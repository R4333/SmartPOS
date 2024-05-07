"use client"
import {Search} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface SearchBarProps {

    onChange?: (value: string) => void;

}

const SearchBar: React.FC<SearchBarProps> = ({onChange}) => {
const [focus, setFocus] = useState(false)
const [searchValue, setSearchValue] = useState('');

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    onChange && onChange(value); // Call the onChange prop if it's defined
  };

return (
          <div className={`relative self-center flex-1 md:grow-0 transition-all duration-300 ${focus ? 'w-6/12' : 'w-5/12'}`}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for item..."
              className="w-full rounded-lg bg-secondary pl-8"
              onFocus={()=>setFocus(true)}
              onBlur={()=>setFocus(false)}
              onChange={handleInputChange}
              />
          </div>
    )
}

export default SearchBar;
