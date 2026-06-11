import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("inovare-theme");
    return (stored as Theme) || "dark";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    
    localStorage.setItem("inovare-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    
    // Add transition class to body for smooth 1s delay
    document.body.classList.add("theme-transitioning");
    
    // Apply theme change after a brief moment to let transition setup
    setTimeout(() => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, 50);
    
    // Remove transition class after 1 second animation completes
    setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
      setIsTransitioning(false);
    }, 1050);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
