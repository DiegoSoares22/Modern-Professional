import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronRight } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaPhone } from "react-icons/fa";
import logoImg from "@assets/logo-inovare.jpg";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  options?: ChatOption[];
}

interface ChatOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Olá! 👋 Bem-vindo à Inovare Móveis Planejados! Sou o assistente virtual e estou aqui para ajudá-lo. Como posso auxiliá-lo hoje?",
  sender: "bot",
  options: [
    { label: "Nossos Serviços", value: "servicos" },
    { label: "Projetos Realizados", value: "projetos" },
    { label: "Contato & WhatsApp", value: "contato" },
    { label: "Redes Sociais", value: "redes" },
    { label: "Solicitar Orçamento", value: "orcamento" },
  ],
};

const BOT_RESPONSES: Record<string, Message> = {
  servicos: {
    id: 0,
    text: "🏠 Na Inovare, somos especialistas em **móveis planejados sob medida**. Nossos serviços incluem:\n\n✨ **Cozinhas Planejadas** — funcionais e elegantes\n🛋️ **Salas de Estar** — sofisticação e conforto\n🛏️ **Quartos Sob Medida** — design que reflete seu estilo\n💼 **Home Office** — produtividade com personalidade\n🏗️ **Closets & Armários** — organização premium\n📐 **Projeto 3D Personalizado** — visualize antes de construir\n\nCada projeto é 100% personalizado para o seu espaço!",
    sender: "bot",
    options: [
      { label: "Ver Projetos", value: "projetos" },
      { label: "Solicitar Orçamento", value: "orcamento" },
      { label: "Voltar ao Início", value: "inicio" },
    ],
  },
  projetos: {
    id: 0,
    text: "📸 Nossos projetos são desenvolvidos com excelência e atenção aos detalhes:\n\n🔹 **Escritório Planejado** — Ambiente corporativo com design autoral e funcionalidade moderna\n🔹 **Home Office Moderno** — Espaço otimizado para máxima produtividade\n🔹 **Ambiente Personalizado** — Projeto exclusivo que traduz a personalidade do cliente\n\n🏆 Cada projeto é uma obra de arte exclusiva, com materiais nobres e acabamento impecável.\n\nQuer ver mais? Visite nosso Instagram para o portfólio completo!",
    sender: "bot",
    options: [
      { label: "Instagram", value: "redes" },
      { label: "Solicitar Orçamento", value: "orcamento" },
      { label: "Voltar ao Início", value: "inicio" },
    ],
  },
  contato: {
    id: 0,
    text: "📞 Entre em contato com a Inovare:\n\n📱 **WhatsApp:** Clique no botão abaixo para falar conosco diretamente!\n\n📲 **Telefone:** Ligue ou mande mensagem pelo WhatsApp\n\n⏰ **Horário de Atendimento:**\nSeg à Sex: 8h às 18h\nSáb: 8h às 12h\n\n💬 Respondemos rapidamente! Não hesite em nos procurar.",
    sender: "bot",
    options: [
      {
        label: "Chamar no WhatsApp",
        value: "whatsapp_link",
        icon: <FaWhatsapp className="w-4 h-4" />,
      },
      { label: "Solicitar Orçamento", value: "orcamento" },
      { label: "Voltar ao Início", value: "inicio" },
    ],
  },
  redes: {
    id: 0,
    text: "🌐 Siga a Inovare nas redes sociais e acompanhe nossos projetos!\n\n📸 **Instagram:** @inovaremoveis_\nAcompanhe nossos projetos mais recentes, dicas de decoração e bastidores da nossa produção.\n\n💚 **WhatsApp:** Fale diretamente conosco\n\nNão perca nenhuma novidade!",
    sender: "bot",
    options: [
      {
        label: "Abrir Instagram",
        value: "instagram_link",
        icon: <FaInstagram className="w-4 h-4" />,
      },
      {
        label: "Chamar no WhatsApp",
        value: "whatsapp_link",
        icon: <FaWhatsapp className="w-4 h-4" />,
      },
      { label: "Voltar ao Início", value: "inicio" },
    ],
  },
  orcamento: {
    id: 0,
    text: "💰 Solicitar um orçamento é fácil e sem compromisso!\n\n📋 Para elaborar sua proposta personalizada, precisamos saber:\n\n1️⃣ Qual ambiente deseja planejar?\n2️⃣ Quais são as medidas do espaço?\n3️⃣ Tem alguma referência de estilo?\n\n🔥 **Promoção especial:** Consulta e projeto 3D gratuitos para novos clientes!\n\nClique abaixo para conversar diretamente com nossa equipe pelo WhatsApp:",
    sender: "bot",
    options: [
      {
        label: "Falar com Consultor",
        value: "whatsapp_link",
        icon: <FaWhatsapp className="w-4 h-4" />,
      },
      { label: "Ver Serviços", value: "servicos" },
      { label: "Voltar ao Início", value: "inicio" },
    ],
  },
  inicio: INITIAL_MESSAGE,
};

function formatBotText(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold text
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const formattedParts = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (line.trim() === "") {
      return <br key={i} />;
    }

    return (
      <span key={i}>
        {formattedParts}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (value: string) => {
    // Handle external links
    if (value === "whatsapp_link") {
      window.open("https://wa.me/message/SS2WQNCSJY2YF1", "_blank");
      return;
    }
    if (value === "instagram_link") {
      window.open("https://www.instagram.com/inovaremoveis_", "_blank");
      return;
    }

    const option = messages[messages.length - 1]?.options?.find(
      (o) => o.value === value
    );

    if (option) {
      // Add user message
      const userMsg: Message = {
        id: Date.now(),
        text: option.label,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMsg]);

      // Simulate typing
      setIsTyping(true);
      setTimeout(() => {
        const response = BOT_RESPONSES[value];
        if (response) {
          setMessages((prev) => [
            ...prev,
            { ...response, id: Date.now() + 1 },
          ]);
        }
        setIsTyping(false);
      }, 800 + Math.random() * 600);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Bot auto-response for free-text
    setIsTyping(true);
    setTimeout(() => {
      const responseMsg: Message = {
        id: Date.now() + 1,
        text: "Obrigado pela sua mensagem! 😊 Para um atendimento mais rápido e personalizado, recomendamos falar diretamente com nossa equipe pelo WhatsApp. Nossos consultores estão prontos para ajudá-lo!",
        sender: "bot",
        options: [
          {
            label: "Falar no WhatsApp",
            value: "whatsapp_link",
            icon: <FaWhatsapp className="w-4 h-4" />,
          },
          { label: "Ver Serviços", value: "servicos" },
          { label: "Voltar ao Início", value: "inicio" },
        ],
      };
      setMessages((prev) => [...prev, responseMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chatbot-toggle"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
            onClick={() => setIsOpen(true)}
            className="chatbot-trigger fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group overflow-hidden border-2 border-primary/40 hover:border-primary transition-all duration-300"
            aria-label="Abrir chat"
          >
            <img
              src={logoImg}
              alt="Chat Inovare"
              className="w-full h-full object-cover rounded-full"
            />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping" />
            {/* Tooltip */}
            <div className="absolute left-full ml-4 bg-card text-foreground px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-border">
              Fale conosco! 💬
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.35, type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(600px,calc(100vh-3rem))] sm:h-[580px] chatbot-window rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="chatbot-header px-5 py-4 flex items-center gap-3 border-b border-border/50 shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shrink-0">
                <img
                  src={logoImg}
                  alt="Inovare"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground font-semibold text-sm leading-tight">
                  Inovare Móveis Planejados
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-muted-foreground text-xs">Online agora</span>
                </div>
              </div>
              <button
                id="chatbot-close"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chatbot-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${msg.sender === "user" ? "order-1" : ""}`}>
                    {msg.sender === "bot" && (
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/30 shrink-0 mt-0.5">
                          <img src={logoImg} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="chatbot-msg-bot rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                            {formatBotText(msg.text)}
                          </div>
                          {msg.options && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {msg.options.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => handleOptionClick(opt.value)}
                                  className="chatbot-option-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                                >
                                  {opt.icon}
                                  {opt.label}
                                  <ChevronRight className="w-3 h-3 opacity-50" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {msg.sender === "user" && (
                      <div className="chatbot-msg-user rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
                        {msg.text}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/30 shrink-0">
                    <img src={logoImg} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="chatbot-msg-bot rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chatbot-input-area px-4 py-3 border-t border-border/50 shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  id="chatbot-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-transparent border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  id="chatbot-send"
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
