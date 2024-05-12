"use client";
import Link from "next/link"
import {Tooltip,TooltipContent,TooltipTrigger,TooltipProvider} from "@/components/ui/tooltip"
import { useState } from "react"
import { usePathname, useRouter } from 'next/navigation'
import {
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Home,
  UsersRound,
} from "lucide-react"
import { handleClientScriptLoad } from "next/script";
export default function NewSideBarItems(){

const currentPath = usePathname();
const [path, setPath] = useState(`${currentPath.split("/")[1]}`);
const router = useRouter();
const handleClick = (route:string)=> {
    console.log(`Handling ${route}`)
    router.push(`/${route}`);
}
return(
<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-border bg-background sm:flex">
        <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg ${path === "dashboard" ? " bg-secondary text-accent-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
              onClick={()=> {
                  setPath("dashboard")
                  handleClick("dashboard")
              }
                    
                  }>
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex h-9 w-9  cursor-pointer items-center justify-center rounded-lg ${path === "inventory" ? "bg-secondary text-accent-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={()=> {
                  setPath("inventory")
                  handleClick("inventory")
              }}>
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Inventory</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Inventory</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex h-9 w-9 items-center  cursor-pointer justify-center rounded-lg  ${path === "account" ? "bg-secondary text-accent-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                onClick={()=> {
                  setPath("account")
                  handleClick("account")
              }}>

                <Package className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Account</TooltipContent>
          </Tooltip>
           <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg ${path === "dashboard" ? " bg-secondary text-accent-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
              onClick={()=> {
                  setPath("users")
                  handleClick("users")
              }
                    
                  }>
                <UsersRound className="h-5 w-5" />
                <span className="sr-only">Manage Users</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Manage Users</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${path === "settings" ? "bg-secondary text-accent-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
              onClick={()=>setPath("settings")}>
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
        </TooltipProvider>
      </aside>

    )
}
