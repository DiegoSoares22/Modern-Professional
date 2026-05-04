import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function CTA() {
  return (
    <section className="py-32 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
            Transforme seu ambiente <span className="text-primary italic">hoje mesmo</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light mb-12">
            Permita-nos apresentar uma proposta que irá elevar o padrão do seu espaço.
          </p>
          <a
            href="https://wa.me/message/SS2WQNCSJY2YF1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background text-sm font-medium tracking-wide uppercase transition-all hover:bg-primary hover:text-primary-foreground shadow-2xl"
          >
            <FaWhatsapp className="w-6 h-6" />
            Peça seu orçamento sem compromisso
          </a>
        </motion.div>
      </div>
    </section>
  );
}