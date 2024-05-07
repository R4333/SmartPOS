"use client"
import SignOutBtn from "@/components/auth/SignOutBtn";
import { getUserAuth } from "@/lib/auth/utils";
import SearchBar from "./components/Search";
import CategoryTab from "./components/CategoryTab";
import {useState} from 'react'

export default function Home() {

const [query, setQuery] = useState("")

const handleChange = (value: string) => {
    setQuery(value);
};

return (
    <main className="">
      <pre className="flex flex-col justify-between pt-4 h-[1000px]">
      <SearchBar onChange={handleChange}/>
      <CategoryTab value={query}/>
      </pre>
      {/*<SignOutBtn />*/}
    </main>
  );
}
