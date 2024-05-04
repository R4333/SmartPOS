import SignOutBtn from "@/components/auth/SignOutBtn";
import { getUserAuth } from "@/lib/auth/utils";
import SearchBar from "./components/Search";
import CategoryTab from "./components/CategoryTab";

export default async function Home() {
 //const { session } = await getUserAuth();
  return (
    <main className="">
      <pre className="flex flex-col items-center justify-between pt-4 h-72 pb-28">
      <SearchBar />
      <CategoryTab />
      </pre>
      <SignOutBtn />
    </main>
  );
}
