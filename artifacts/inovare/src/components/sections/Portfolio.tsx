import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import img1 from "@assets/1_1777919654942.png";
import img2 from "@assets/2_1777919654942.png";

const projects = [
  {
    id: 1,
    title: "Escritório Planejado",
    image: img1,
  },
  {
    id: 2,
    title: "Home Office Moderno",
    image: img2,
  },
  {
    id: 3,
    title: "Ambiente Personalizado",
    image: null,
  },
];

export function Portfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = setInterval(() => {
      scrollNext();
    }, 4000);
    return () => clearInterval(autoplay);
  }, [scrollNext]);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-foreground text-center">
            Projetos <span className="text-primary italic">Assinados</span>
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-6" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full max-w-[90vw] mx-auto"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 md:gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative flex-[0_0_100%] md:flex-[0_0_70%] lg:flex-[0_0_60%] min-w-0 aspect-[16/10] md:aspect-[21/9] rounded-sm overflow-hidden group cursor-grab active:cursor-grabbing"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-card to-muted flex items-center justify-center border border-border/50">
                    <p className="text-2xl md:text-4xl font-serif text-muted-foreground/50 italic">
                      Seu Projeto Aqui
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-3xl font-serif text-foreground">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}