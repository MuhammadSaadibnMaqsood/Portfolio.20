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
    clipPath: "inset(0% 0% 100% 0%",
    transition: { duration: 1.0, ease },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%",
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
        onClick={()=>setOpen((v)=> !v)}
          className="flex flex-col items-center justify-center gap-[5px] w-14 h-14 md:w-16 md:h-16 rounded-full bg-black transition-colors duration-300 relative "
          style={{
            boxShadow: "0 0 0 1px rgba(255, 255,255, 0.6)",
            WebkitFontSmoothing: "antialiased",
          }}
          aria-label={open? "CLose menu": "open menu"}
        ></button>
      </div>
    </>
  );
};

export default Navigation;
