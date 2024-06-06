import HomeComponent from "@/components/home";
import Login from "@/components/login";

export default function Home() {
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center font-Virgil text-4xl bg-[rgba(0,0,0,0.5)] text-[black]">
      {/* <Login /> */}
      <HomeComponent />
    </div>
  );
}
