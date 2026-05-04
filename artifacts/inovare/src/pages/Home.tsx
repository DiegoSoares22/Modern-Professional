import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Differentials } from "@/components/sections/Differentials";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-background w-full overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <Hero />
      <Portfolio />
      <About />
      <Differentials />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}