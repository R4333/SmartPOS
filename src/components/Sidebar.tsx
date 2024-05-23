import Link from "next/link";

import NewSideBarItems from "./NewSideBarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
          <NewSideBarItems session={session}/>
  );
};

export default Sidebar;
