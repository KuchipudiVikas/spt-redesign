import localFont from "next/font/local";
import Hero from "@/components/Home/Hero";
import MainLayout from "@/components/Layout";
import Home from "@/page_components/Home";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Index() {
  return (
    <div className={` `}>
      <MainLayout
        Title={<Hero />}
        Body={<Home />}
        title="Home"
        description="Home Page"
        keywords="Home"
      />
    </div>
  );
}
