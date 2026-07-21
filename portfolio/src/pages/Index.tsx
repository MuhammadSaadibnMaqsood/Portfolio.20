import React, { useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
// import SelectedWorks from "./SelectedWorks";
// import VectorBridge from "./Vector-Bridge";
// import Footer from "./Footer";
// import Contact from "./Contact";
// import Testimonial from "./Testimonial";
// import Navigation from "../components/Navigation";

const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 h-6 w-6 bg-gray-400/50 rounded-full pointer-events-none z-[9999] hidden lg:block backdrop-blur-[1px]"
      style={{ x, y }}
    />
  );
};

// Subtle film-grain overlay to keep the pure-black background from feeling flat
const GrainOverlay = () => (
  <div
    className="fixed inset-0 z-[1] pointer-events-none opacity-[0.035] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
);

const BrandLogo = () => (
  <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 mix-blend-difference">
    <motion.h1
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="font-sans font-black text-2xl md:text-4xl tracking-tighter text-white flex items-start"
    >
      SAAD{" "}
      <span className="text-xs md:text-lg font-medium ml-1 mt-1 md:mt-2">
        &copy;
      </span>
    </motion.h1>
  </div>
);

const Availability = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
    className="absolute z-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 pointer-events-none"
    style={{ top: "2.25rem" }}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
    </span>
    <span className="font-sans font-black text-[9px] tracking-[0.25rem] uppercase text-white">
      Available for work
    </span>
  </motion.div>
);

const SpinningCTA = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
    className="absolute z-30 flex items-center justify-center bottom-6 right-6 md:bottom-16 md:right-36"
  >
    <style>{`
      @keyframes ctaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .cta-ring { animation: ctaSpin var(--cta-spin-duration, 10s) linear infinite; transform-origin: center; }
      .cta-wrap:hover .cta-ring { --cta-spin-duration: 3s; }
      .cta-wrap { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      .cta-wrap:hover { transform: scale(1.08); }
      .cta-wrap:focus-visible { outline: 2px solid white; outline-offset: 6px; border-radius: 9999px; }
    `}</style>
    <a
      href="#contact"
      className="cta-wrap group relative flex items-center justify-center w-[100px] h-[100px] md:w-[130px] md:h-[130px]"
      aria-label="Get in touch"
    >
      <svg
        viewBox="0 0 130 130"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <circle
          cx="65"
          cy="65"
          r="62"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
      </svg>
      <svg
        viewBox="0 0 130 130"
        className="cta-ring absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <path
            id="cta-circle-path"
            d="M65,65 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"
          />
        </defs>
        <text
          fill="rgba(255,255,255,1)"
          fontSize="8.5"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          letterSpacing="4"
        >
          <textPath href="#cta-circle-path">
            GET IN TOUCH · GET IN TOUCH · GET IN TOUCH ·&nbsp;
          </textPath>
        </text>
      </svg>
      <span
        className="absolute inset-3 md:inset-4 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"
        style={{ transformOrigin: "center" }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="relative z-10 w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black"
        style={{ transition: "color 0.3s ease" }}
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  </motion.div>
);

const SocialStrip = () => {
  const social = [
    {
      label: "Github",
      icon: Github,
      href: "https://github.com/MuhammadSaadibnMaqsood",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/muhammad-saad-198567355/",
    },
    {
      label: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/hs_creative_26?igsh=MW5zdmxvc21idWdqNA==",
    },
    {
      label: "Email",
      icon: Mail,
      href: "mailto:muhammad.64001@iqra.edu.pk",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="fixed z-20 hidden md:flex flex-col items-center gap-4"
      style={{
        right: "64px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {/* Top vertical divider line */}
      <span className="w-[1px] h-12 bg-white/30 flex-shrink-0" />

      {/* Social Icons */}
      {social.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-white/70 hover:text-white transition-colors duration-200 p-2"
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}

      {/* Bottom vertical divider line */}
      <span className="w-[1px] h-12 bg-white/30 flex-shrink-0" />
    </motion.div>
  );
};

const MobileSocialStrip = () => {
  const social = [
    {
      label: "Github",
      icon: Github,
      href: "https://github.com/MuhammadSaadibnMaqsood",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/muhammad-saad-198567355/",
    },
    {
      label: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/hs_creative_26?igsh=MW5zdmxvc21idWdqNA==",
    },
    {
      label: "Email",
      icon: Mail,
      href: "mailto:muhammad.64001@iqra.edu.pk",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      className="flex items-center gap-3 md:hidden pointer-events-auto"
    >
      {social.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-white/70 hover:text-white transition-colors block duration-200 p-1"
        >
          <Icon size={18} strokeWidth={2.5} />
        </a>
      ))}
    </motion.div>
  );
};

// Signature detail: a scroll cue that fills the otherwise-empty grid space
// beside the bio line, and quietly signals there's more below the fold.
const ScrollCue = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
    className="hidden md:flex md:col-span-7 lg:col-span-8 items-end justify-end gap-3"
  >
    <span className="font-sans text-[10px] font-medium tracking-[0.2rem] uppercase text-white/50">
      Scroll
    </span>
    <span className="relative w-[1px] h-10 bg-white/20 overflow-hidden">
      <motion.span
        className="absolute top-0 left-0 w-full h-3 bg-white"
        animate={{ y: ["-20%", "140%"] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  </motion.div>
);

const Index = () => {
  const footerContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"],
  });

  const footerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div className="min-h-screen relative bg-black selection:bg-white selection:text-black">
      <GrainOverlay />
      <BrandLogo />
      <CursorFollower />

      {/* Top Right Mobile Social Icons */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <MobileSocialStrip />
      </div>

      <section className="relative h-screen bg-black flex flex-col px-6 py-12 md:px-16 md:py-16 z-20 overflow-hidden">
        <Availability />
        <SocialStrip />
        <SpinningCTA />
      </section>

      <div className="z-10 mt-auto mb-6 md:mb-8 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 5, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          className="w-fit"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden border border-white/30 px-5 py-3 flex items-center gap-3 hover:border-white transition-colors duration-500 w-fit mb-6 md:hidden"
          >
            <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            <span className="relative font-sans font-black text-[10px] tracking-[0.25rem] uppercase text-white group-hover:text-black transition-colors duration-300 z-10">
              GET IN TOUCH
            </span>

            <svg
              className="relative w-3 h-3 text-white group-hover:text-black transition-colors duration-300 z-10"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M1 6h10M6 1l5 5-5 5" />
            </svg>
          </a>

          <h1 className="font-sans font-bold text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] leading-[0.85] tracking-tighter text-white uppercase text-left">
            Driven <br />
            by logic
          </h1>
        </motion.div>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-12 w-full gap-4 mb-8 md:mb-0 px-6 md:px-16 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
          className="col-span-1 md:col-span-5 lg:col-span-4"
        >
          <div className="w-12 h-[2px] bg-white mb-6 md:hidden"></div>
          <p className="font-sans text-xs md:text-sm font-medium text-white leading-relaxed tracking-wide uppercase text-left">
            Building robust software, automating the complex, and turning static
            systems into intelligent ones.
          </p>
        </motion.div>

        <ScrollCue />
      </div>
    </div>
  );
};

export default Index;
