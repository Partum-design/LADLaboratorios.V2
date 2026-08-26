"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ChatbotWidget from "@/components/ChatbotWidget";
import CustomCursor from "@/components/cursor/CustomCursor";
import FloatingButtons from "@/components/FloatingButtons";
import LenisProvider from "@/components/motion/LenisProvider";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Preloader from "./Preloader";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <LenisProvider>
      <CustomCursor />
      <Preloader />
      <FloatingButtons />
      <ChatbotWidget />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <main key={pathname} className="min-h-screen">
          {children}
        </main>
      </AnimatePresence>
      <Footer />
    </LenisProvider>
  );
}
