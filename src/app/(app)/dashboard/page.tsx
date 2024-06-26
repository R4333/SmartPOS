"use client"
import SignOutBtn from "@/components/auth/SignOutBtn";
import { getUserAuth } from "@/lib/auth/utils";
import SearchBar from "./components/Search";
import CategoryTab from "./components/CategoryTab";
import {useState} from 'react'
import Cart from "./components/Cart";
export default function Home() {

const [query, setQuery] = useState("")
const [selected, setSelected] = useState<Object>({});

const handleChange = (value: string) => {
    setQuery(value);
};

return (
    <main className="">
      <pre className="flex flex-col justify-between pt-4 h-[900px]">
      <SearchBar onChange={handleChange}/>
      <CategoryTab globalSearchValue={query}/>
      </pre>
      {/*<SignOutBtn />*/}
    </main>
  );
}
