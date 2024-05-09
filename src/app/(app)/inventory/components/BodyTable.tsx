"use client";

import {TableBody} from "@/components/ui/table";
import TableEntry from "./TableEntry"

import { useState, useEffect} from "react";

export default function BodyTable(){

  const [data, setData] = useState([]);

  useEffect(()=> {
    console.log("Hello")
    async function getItems(){
        console.log("running get items")
        const response = await fetch('/api/inventory', {cache: 'no-store'})
        const data = await response.json();
        setData(data['product'])
    }
    getItems()
  }, [])

return (

        <TableBody>
            {
                data ?  data.map((d:any, i:any) => {
                          return (
                             <TableEntry key={i} name={d.name} price={d.price} createdAt={d.createdAt} />
                          )
                }) : null
            }
        </TableBody>

)}
