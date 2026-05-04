import React from "react";
import { motion } from "framer-motion";
import { PenTool, Sparkles, HeartHandshake, CheckCircle } from "lucide-react";

const differentials = [
  {
    icon: PenTool,
    title: "Projeto 100% Personalizado",
    description: "Desenhado sob medida para o seu espaço e suas necessidades.",
  },
  {
    icon: Sparkles,
    title: "Acabamento de Alta Qualidade",
    description: "Materiais nobres e atenção obsessiva aos detalhes.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento Próximo",
    description: "Acompanhamento exclusivo do início ao fim da execução.",
  },
  {
    icon: CheckCircle,
    title: "Execução com Excelência",
    description: "Montagem precisa e rigorosa, sem surpresas no prazo.",
  },
];

export function Differentials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                <item.icon strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}