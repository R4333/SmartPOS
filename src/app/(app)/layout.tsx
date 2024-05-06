import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import NewSideBarItems from "@/components/NewSideBarItems";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <main>
      <div className="flex h-screen pl-16 pt-2">
        <NewSideBarItems/>
        <main className="flex-1 m-0 overflow-y-auto overflow-x-hidden">{children}</main>
        <Toaster richColors />
      </div>
    </main>
  );
}
