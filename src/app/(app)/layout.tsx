import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NewSideBarItems from "@/components/NewSideBarItems";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <main>
      <div className="flex h-screen pl-14">
        <NewSideBarItems/>
        <main className="flex-1 m-0 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
      <Toaster richColors />
    </main>
  );
}
