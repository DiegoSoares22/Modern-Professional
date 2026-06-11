import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Differentials } from "@/components/sections/Differentials";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-background w-full overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <Header />
      <div id="inicio">
        <Hero />
      </div>
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="sobre">
        <About />
      </div>
      <div id="diferenciais">
        <Differentials />
      </div>
      <div id="contato">
        <CTA />
      </div>
      <Footer />
      <FloatingWhatsApp />
      <Chatbot />
    </main>
  );
}