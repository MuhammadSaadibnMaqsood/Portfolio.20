import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type EntryProps = {
  title: string;
  subtitle?: string;
  date?: string;
  current?: boolean;
};

const Entry = ({ title, subtitle, date, current }: EntryProps) => (
  <motion.div 
    whileHover={{ x: 10 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 cursor-default border-l-2 border-transparent hover:border-black pl-0 hover:pl-4 transition-all duration-300"
  >
    <div className="flex-1">
      <p className="font-sans text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-tight group-hover:text-black/60 transition-colors">
        {title}
      </p>
      {subtitle && (
        <p className="font-sans text-sm md:text-base font-medium text-black/50 uppercase tracking-wider">
          {subtitle}
        </p>
      )}
    </div>

    {date && (
      <div className="flex items-center gap-2 shrink-0 pb-1">
        {current && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
        )}
        <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/40 group-hover:text-black group-hover:scale-110 transition-all">
          {date}
        </span>
      </div>
    )}
  </motion.div>
);

const About = () => {
  // 1. Dynamic viewport height tracking
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  // 2. Framer Motion Scroll Hooks
  const { scrollY } = useScroll();

  // Section Label Transform
  const yLabel = useTransform(scrollY, [0, vh * 0.4], [80, 0]);
  const opacityLabel = useTransform(scrollY, [0, vh * 0.3], [0, 1]);

  // Education Transform
  const y1 = useTransform(scrollY, [vh * 0.1, vh * 0.5], [80, 0]);
  const opacity1 = useTransform(scrollY, [vh * 0.1, vh * 0.4], [0, 1]);

  // Certification Transform
  const y2 = useTransform(scrollY, [vh * 0.2, vh * 0.6], [80, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.2, vh * 0.5], [0, 1]);

  // Experience Transform
  const y3 = useTransform(scrollY, [vh * 0.3, vh * 0.7], [80, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.3, vh * 0.6], [0, 1]);

  return (
    <section className="h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-20 overflow-hidden flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12 w-full max-w-[1400px] mx-auto h-full max-h-[85vh]">
        
        {/* Left: Section Label */}
        <motion.div 
          style={{ y: yLabel, opacity: opacityLabel }}
          className="md:col-span-3 pt-10"
        >
          <h2 className="font-sans text-xs font-black uppercase tracking-[0.3em] text-black/20">
            Background
          </h2>
        </motion.div>

        {/* Right: Content container */}
        <div className="col-span-1 md:col-span-9 flex flex-col justify-between h-full">
          
          {/* 01. EDUCATION */}
          <motion.div 
            style={{ y: y1, opacity: opacity1 }}
            className="flex flex-col gap-3"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">01. Education</h3>
            <Entry
              title="Iqra University, Karachi"
              subtitle="BS Software Engineering"
              date="2023 — 2027"
            />
          </motion.div>

          <div className="border-t border-black/5" />

          {/* 02. CERTIFICATION */}
          <motion.div 
            style={{ y: y2, opacity: opacity2 }}
            className="flex flex-col gap-3"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">02. Certification</h3>
            <div className="space-y-4">
              <Entry
                title="SMIT, Gulshan"
                subtitle="Web & App Development"
                date="2024 — 2025"
              />
              <Entry title="Google" subtitle="Introduction to GenAI" date="2024" />
            </div>
          </motion.div>

          <div className="border-t border-black/5" />

          {/* 03. EXPERIENCE */}
          <motion.div 
            style={{ y: y3, opacity: opacity3 }}
            className="flex flex-col gap-3"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">03. Experience</h3>
            <div className="space-y-4">
              <Entry
                title="DecodesLabs"
                subtitle="Full Stack Developer Intern"
                date="2026"
              />
              <Entry
                title="Freelancing"
                subtitle="Independent Developer"
                date="Present"
                current
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;