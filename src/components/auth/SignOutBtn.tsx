"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { signOutAction } from "@/lib/actions/users";
import { DoorClosed } from "lucide-react";

export default function SignOutBtn() {
  return (
    <form action={signOutAction} className="w-full text-left">
      <Btn />
    </form>
  );
}

const Btn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size='icon' className="ml-1 h-8 w-8" variant="destructive" disabled={pending} >
        <DoorClosed color="white"/>
    </Button>
  );
};
