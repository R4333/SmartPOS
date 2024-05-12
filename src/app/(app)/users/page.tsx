"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { signUpAction } from "@/lib/actions/users";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthFormError from "@/components/auth/AuthFormError";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SignUpPage() {
  const [state, formAction] = useFormState(signUpAction, {
    error: "",
  });

  return (
    <main className="max-w-lg mx-auto my-4 bg-background p-10 border rounded-md">
      <h1 className="text-2xl font-bold text-center">New User</h1>
      <AuthFormError state={state} />
      <form action={formAction}>
        <Label htmlFor="name" className="text-muted-foreground">
         Name 
        </Label>
        <Input name="name" pattern= "[a-zA-Z]+" type="text" id="name" required />
        <br />
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <Input name="email" type="email" id="email" required />
        <br />
        <Label htmlFor="password" className="text-muted-foreground">
          Password
        </Label>
        <Input type="password" name="password" id="password" required />
        <br />
        <Label htmlFor="role" className="text-muted-foreground">
         Role 
        </Label>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
            </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
        <br />
      <SubmitButton />
      </form>
   </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      Sign{pending ? "ing" : ""} up
    </Button>
  );
};
