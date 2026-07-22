import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  number: string;
}
interface SocialItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about", number: "01" },
  { label: "Work", href: "#work", number: "02" },
  { label: "Philosophy", href: "#philosophy", number: "03" },
  { label: "Contact", href: "#contact", number: "04" },
];
const socialItems: SocialItem[] = [
  {
    label: "Github",
    href: "https://github.com/MuhammadSaadibnMaqsood",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-saad-198567355/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hs_creative_26?igsh=MW5zdmxvc21idWdqNA==",
  },
  {
    label: "Email",
    href: "mailto:muhammad.64001@iqra.edu.pk",
  },
];

const ease = [0.76, 0, 0.24, 1] as [number, number, number, number];
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const overlayVariant: Variants = {
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 1.0, ease },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.0, ease },
  },
};

const itemVariant: Variants = {
  closed: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.8, ease },
  },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1.0, delay: 0.4 + i * 0.1, ease: easeOut },
  }),
};

const scrollVariant: Variants = {
  closed: {
    y: 10,
    opacity: 0,
    transition: { duration: 0.6, ease },
  },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.6 + i * 0.08, ease: "easeOut" },
  }),
};

const Navigation = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  // Close the menu on Escape, since it's a full-screen overlay with no
  // other obvious dismiss action besides the toggle button.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="fixed top-6 right-6 md:top-8 md:right-10 z-[200]"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col items-center justify-center gap-[5px] w-14 h-14 md:w-16 md:h-16 rounded-full bg-black transition-colors duration-300 relative"
          style={{
            boxShadow: "0 0 0 1px rgba(255, 255,255, 0.6)",
            WebkitFontSmoothing: "antialiased",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <motion.span
            animate={
              open
                ? { rotate: 45, y: 6.5, scaleX: 0.8 }
                : { rotate: 0, y: 0, scaleX: 1 }
            }
            transition={{ duration: 0.6, ease }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{
              top: "35%",
            }}
          ></motion.span>
          <motion.span
            animate={
              open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.4, ease }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{
              top: "50%",
              marginTop: "-0.75px",
            }}
          ></motion.span>
          <motion.span
            animate={
              open
                ? { rotate: -45, y: -6.5, scaleX: 0.8 }
                : { rotate: 0, y: 0, scaleX: 1 }
            }
            transition={{ duration: 0.4, ease }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{
              bottom: "35%",
            }}
          ></motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            variants={overlayVariant}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] bg-black flex flex-col px-8 md:px-16 pt-16 pb-10 md:pb-16 md:pt-14"
          >
            {/* Social row: stays small, pinned near the top */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-10 md:pt-8">
              <p className="text-sm text-white/70 uppercase tracking-widest font-mono mr-2">
                Social
              </p>
              {socialItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  variants={scrollVariant}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="text-base md:text-lg font-medium text-white hover:opacity-40"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Primary nav: takes the remaining space and centers itself in
                it, with bottom padding to sit a little above dead-center
                instead of pinned to the very bottom of the screen. */}
            <nav className="flex-1 flex flex-col justify-center gap-0 pb-16 md:pb-28">
              {navItems.map((item, i) => (
                <div
                  key={item.label}
                  className="group overflow-hidden border-b border-white/20 py-3 md:py-5"
                >
                  <motion.a
                    href={item.href}
                    onClick={handleNavClick}
                    custom={i}
                    variants={itemVariant}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="flex items-center gap-4 md:gap-6"
                  >
                    <span className="text-xs md:text-sm font-mono text-white/40 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-green-400">
                      {item.number}
                    </span>

                    <span className="flex items-center gap-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:group-hover:translate-x-5">
                      <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none text-white transition-opacity duration-500 group-hover:opacity-70">
                        {item.label}
                      </span>

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="w-6 h-6 md:w-9 md:h-9 text-green-400 opacity-0 -translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                  </motion.a>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;