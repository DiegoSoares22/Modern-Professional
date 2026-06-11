import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import logoImg from "@assets/logo-inovare.jpg";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "header-scrolled"
            : "header-top"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-[72px] md:h-[80px]">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); scrollToSection("#inicio"); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border border-primary/30 group-hover:border-primary transition-colors duration-300 shadow-lg shadow-primary/10">
              <img
                src={logoImg}
                alt="Inovare Móveis Planejados"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-lg md:text-xl font-serif tracking-wider leading-none">
                INOVARE
              </span>
              <span className="text-primary text-[10px] md:text-xs tracking-[0.2em] uppercase font-light">
                Móveis Planejados
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-muted-foreground hover:text-primary text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              disabled={isTransitioning}
              className="relative w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm group overflow-hidden"
              aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-[18px] h-[18px] text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: 20, opacity: 0, rotate: 90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-[18px] h-[18px] text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* WhatsApp CTA - Desktop */}
            <a
              href="https://wa.me/message/SS2WQNCSJY2YF1"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-medium tracking-wider uppercase transition-all hover:bg-primary/90 rounded-sm"
              id="header-whatsapp-cta"
            >
              <FaWhatsapp className="w-4 h-4" />
              Orçamento
            </a>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl lg:hidden"
            id="mobile-menu"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="text-2xl font-serif text-foreground hover:text-primary transition-colors tracking-wider"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center gap-6 mt-8"
              >
                <a
                  href="https://wa.me/message/SS2WQNCSJY2YF1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Solicitar Orçamento
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center gap-4 mt-4"
              >
                <a
                  href="https://www.instagram.com/inovaremoveis_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
