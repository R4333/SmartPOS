"use client"
import {Search} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function SearchBar(){
const [focus, setFocus] = useState(false)
return (
          <div className={`relative flex-1 md:grow-0 transition-all duration-300 ${focus ? 'w-6/12' : 'w-5/12'}`}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for item..."
              className="w-full rounded-lg bg-background pl-8"
              onFocus={()=>setFocus(true)}/>
          </div>
    )
}
