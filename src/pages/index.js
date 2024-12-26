import Image from "next/image";
import localFont from "next/font/local";
import HeroSection from "@/components/HeroSection";
import TrendingProducts from "@/components/TrendingProducts";
import BestSellers from "@/components/BestSellers";
import NewArrivals from "@/components/NewArrivals";
import CustomerReviews from "@/components/CustomerReviews";
import CategoryHighlights from "@/components/CategoryHighlights";
import Navbar from "@/components/Navbar";
import ScrollingText from "@/components/ScrollingText";
import StayingProduct from "@/components/StayingProduct";

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

export default function Home() {
  return (
   <div>
    <Navbar></Navbar>
    <HeroSection></HeroSection>
    <ScrollingText ></ScrollingText>
    <StayingProduct></StayingProduct>
    <TrendingProducts></TrendingProducts>
    <BestSellers></BestSellers>
    <NewArrivals></NewArrivals>
    <CustomerReviews></CustomerReviews>
    <CategoryHighlights></CategoryHighlights>
   </div>
  );
}
