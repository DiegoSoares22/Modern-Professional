import React from "react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Nossa Essência
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
              Transformando espaços em <br />
              <span className="text-primary italic">experiências únicas</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
              <p>
                Acreditamos que o seu ambiente deve ser um reflexo absoluto da sua identidade. 
                Na Inovare, não construímos apenas móveis; nós materializamos o seu estilo de vida 
                através da marcenaria de alto padrão.
              </p>
              <p>
                Cada projeto é conduzido como uma obra de arte exclusiva. Da escolha criteriosa 
                das madeiras aos acabamentos mais sofisticados, nosso ateliê dedica tempo e primor 
                para que o resultado final supere as expectativas mais exigentes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}