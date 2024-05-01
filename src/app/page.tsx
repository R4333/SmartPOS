import Link from "next/link";
import SignInPage from "../components/Login"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cover justify-center items-center"  style={{backgroundImage: "url('./bg.png')"}}>
		<SignInPage />
    </div>

  );
}

