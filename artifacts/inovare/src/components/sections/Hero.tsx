import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle animated background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80')] bg-cover bg-center"
      />
      
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />

      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            A Arte da <span className="text-primary italic">Exclusividade</span> em Cada Detalhe
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Móveis planejados sob medida para quem não abre mão do extraordinário. 
            Design autoral, acabamento impecável e atendimento dedicado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://wa.me/message/SS2WQNCSJY2YF1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wide uppercase transition-all hover:bg-primary/90 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaWhatsapp className="w-5 h-5" />
              Solicitar Orçamento
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}