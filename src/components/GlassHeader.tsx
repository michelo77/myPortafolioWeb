import ThemeToggle from "./ui/theme-toggle";
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileNavClick = (id: string) => {
    setIsMenuOpen(false);

    // Small timeout to allow menu close animation to start/layout to stabilize
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Habilidades", id: "skills", icon: "🛠️ " },
    { name: "Proyectos", id: "projects", icon: "🚀 " },
    { name: "Certificaciones", id: "awards", icon: "🏆 " },
    { name: "Formación", id: "education", icon: "🎓 " },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md backdrop-filter bg-background/70 dark:bg-background/40 border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-4xl mx-auto p-4 flex justify-between items-center relative">
        <motion.a
          className="flex items-center text-lg font-medium"
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ {personalInfo.name}
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={`#${item.id}`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {item.icon}
              {item.name}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation - Positioned Absolutely */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 w-full border-b border-border/10 backdrop-blur-md backdrop-filter bg-background/95 dark:bg-background/90 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col p-4 space-y-4 text-sm font-medium">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleMobileNavClick(item.id)}
                    className="flex items-center w-full text-left transition-colors hover:text-foreground/80 text-foreground/60 py-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      {item.icon} {item.name}
                    </motion.div>
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
