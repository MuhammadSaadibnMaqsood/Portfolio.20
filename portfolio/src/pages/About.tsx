import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type EntryProps = {
  title: string;
  subtitle?: string;
  date?: string;
  current?: boolean;
};

// A single resume-style line: title/subtitle on the left, date badge on the
// right. Reused across Education, Certification, and Experience so every
// entry reads consistently.
const Entry = ({ title, subtitle, date, current }: EntryProps) => (
  <div className="group flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
    <div>
      <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight transition-opacity duration-300 group-hover:opacity-50">
        {title}
      </p>
      {subtitle && (
        <p className="font-sans text-xl font-normal text-black/70 md:text-2xl lg:text-3xl leading-tight tracking-tight">
          {subtitle}
        </p>
      )}
    </div>

    {date && (
      <div className="flex items-center gap-2 shrink-0 pb-1 md:pb-2">
        {current && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
          </span>
        )}
        <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-black/50 whitespace-nowrap">
          {date}
        </span>
      </div>
    )}
  </div>
);

const About = () => {
  const [vh, setvh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const updateVh = () => setvh(window.innerHeight);
    updateVh();
    window.addEventListener("resize", updateVh);

    return () => window.removeEventListener("resize", updateVh);
  }, []);

  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, vh * 0.4], [80, 0]);
  const opacity1 = useTransform(scrollY, [0, vh * 0.3], [0, 1]);

  const y2 = useTransform(scrollY, [vh * 0.1, vh * 0.5], [80, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.1, vh * 0.4], [0, 1]);

  const y3 = useTransform(scrollY, [vh * 0.2, vh * 0.6], [80, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.2, vh * 0.5], [0, 1]);

  const y4 = useTransform(scrollY, [vh * 0.3, vh * 0.7], [80, 0]);
  const opacity4 = useTransform(scrollY, [vh * 0.3, vh * 0.6], [0, 1]);

  return (
    <section className="h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 overflow-hidden flex items-center justify-center relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto">
        <motion.div
          className="md:col-span-3 lg:col-span-3 pt-2"
          style={{ y: y1, opacity: opacity1 }}
        >
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest">
            Background & Data
          </h2>
        </motion.div>

        <div className="col-span-1 md:col-span-9 lg:col-span-9 flex flex-col gap-10 md:gap-12">
          {/* EDUCATION */}
          <motion.div
            style={{ y: y2, opacity: opacity2 }}
            className="flex flex-col gap-3"
          >
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide mb-1">
              01. Education
            </h3>
            <Entry
              title="Iqra University, Karachi"
              subtitle="BS Software Engineering"
              date="2023 — 2027"
            />
          </motion.div>

          {/* Divider */}
          <div className="border-t border-black/10" />

          {/* CERTIFICATION */}
          <motion.div
            style={{ y: y3, opacity: opacity3 }}
            className="flex flex-col gap-3"
          >
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide mb-1">
              02. Certification
            </h3>
            <div className="flex flex-col gap-6">
              <Entry
                title="SMIT, Gulshan"
                subtitle="Web & App Development"
                date="2024 — 2025"
              />
              <Entry title="Google" subtitle="Introduction to GenAI" />
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-black/10" />

          {/* EXPERIENCE */}
          <motion.div
            style={{ y: y4, opacity: opacity4 }}
            className="flex flex-col gap-3"
          >
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide mb-1">
              03. Experience
            </h3>
            <div className="flex flex-col gap-6">
              <Entry
                title="DecodesLabs"
                subtitle="Full Stack Developer Intern"
                date="May — Jun 2026"
              />
              <Entry
                title="Freelancing"
                subtitle="Independent Software Developer"
                date="2026 — Present"
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