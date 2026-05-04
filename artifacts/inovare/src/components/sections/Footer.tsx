import React from "react";
import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-serif text-foreground tracking-widest">
          INOVARE <span className="text-primary text-sm tracking-normal block md:inline md:ml-2">Móveis Planejados</span>
        </div>
        <div className="text-muted-foreground text-sm font-light">
          &copy; {new Date().getFullYear()} Inovare Móveis Planejados. Todos os direitos reservados.
        </div>
        <a
          href="https://www.instagram.com/inovaremoveis_"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
        >
          <FaInstagram className="w-5 h-5" />
          <span className="font-light">@inovaremoveis_</span>
        </a>
      </div>
    </footer>
  );
}