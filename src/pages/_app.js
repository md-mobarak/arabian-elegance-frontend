// import CartDrawer from "@/components/CartDrawer";
import "@/styles/globals.css";
import { Inter, Poppins, Roboto, Montserrat, Lora, Oswald, Raleway, Playfair_Display, Caveat, Anton } from "next/font/google";

// ফন্ট ইমপোর্ট ও কনফিগারেশন
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-poppins" });
export const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto" });
export const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-montserrat" });
export const lora = Lora({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-lora" });
export const oswald = Oswald({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-oswald" });
export const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-raleway" });
export const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-playfair" });
export const caveat = Caveat({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-caveat" });
export const anton = Anton({ subsets: ["latin"], weight: ["400"], variable: "--font-anton" });

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient} className={`${inter.variable} ${poppins.variable} ${roboto.variable} ${montserrat.variable} ${lora.variable} ${oswald.variable} ${raleway.variable} ${playfair.variable} ${caveat.variable} ${anton.variable}`}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
