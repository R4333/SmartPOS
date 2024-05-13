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
    <Button type="submit" size='icon' variant="ghost" disabled={pending} >
        <DoorClosed color="#850000" />
    </Button>
  );
};
