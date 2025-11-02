import Image from "next/image";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center text-black bg-zinc-50 font-sans dark:bg-black dark:text-white">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <HomeHero/>
      </main>
    </div>
  );
}
