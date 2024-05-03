import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
export const dynamic = 'force-static'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserAuth();
  if (session?.session) redirect("/dashboard");

  return ( <div className="bg-muted h-screen pt-8">{children}</div> );
}
