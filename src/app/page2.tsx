import Image from "next/image";
import ProfilePage from "@/pages/profile";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Header></Header>
      <h1>Hello World</h1>
      <ProfilePage />
    </main>
  );
}
