import * as React from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { useScroll } from "framer-motion";
import { ArrowUpRight, Github, Code2 } from "lucide-react";
import {
  SiReact,
  SiSupabase,
  SiExpress,
  SiNodedotjs,
  SiTypescript,
  SiFramer,
} from "react-icons/si";

// --- Types & Data ---
interface ProjectData {
  title: string;
  image: string;
  category: string;
  techstack: string;
  year: string;
  description: string;
  sitelink?: string;
  github?: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "Khan & Sons",
    image: "/khan.png",
    category: "E-commerce — Full Stack",
    techstack: "React · Supabase · Express · Node",
    year: "2026",
    description:
      "A high-performance e-commerce platform with dynamic product listings and cart management, built for fast load times and a seamless local-vendor experience.",
    sitelink: "https://www.khanandsons.tech/",
  },
  {
    title: "Velta",
    image: "/Velta.png",
    category: "Learning Platform — Full Stack",
    techstack: "React · Node · Express · Supabase · TypeScript",
    year: "2025",
    description:
      "An interactive learning platform with competitive spaces and AI-assisted content delivery, where users challenge each other on what they're learning.",
  },
  {
    title: "Boutique Avenue",
    image: "/boutique.PNG",
    category: "E-commerce — Frontend",
    techstack: "React · TypeScript · Framer Motion",
    year: "2024",
    description: "A concept storefront focused on motion-led product discovery.",
    sitelink: "https://serene-alfajores-578a66.netlify.app/",
    github: "https://github.com/MuhammadSaadibnMaqsood/Boutique-Avenue-",
  },
  {
    title: "Galbi",
    image: "/Galbi.png",
    category: "Food Restaurant — Frontend",
    techstack: "React · TypeScript · Framer Motion",
    year: "2026",
    description: "A restaurant site built around appetite-forward imagery and pacing.",
    sitelink: "https://dazzling-arithmetic-cab235.netlify.app/",
    github: "https://github.com/MuhammadSaadibnMaqsood/GALBI-Restaurant",
  },
];

// --- Tech name -> icon lookup ---
// Keyed by a normalized (lowercase, no spaces/dots) version of the name so
// "Node", "Node.js", "NodeJS" etc. all resolve to the same icon.
const TECH_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  supabase: SiSupabase,
  express: SiExpress,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  typescript: SiTypescript,
  framermotion: SiFramer,
  framer: SiFramer,
};

const normalizeTech = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

const getTechIcon = (name: string) => TECH_ICON_MAP[normalizeTech(name)] ?? Code2;

// --- Single slide (own component so hooks have a stable call order) ---
const ProjectPanel = ({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: ProjectData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [start, end], [0.97, 1]);
  const bgScale = useTransform(scrollYProgress, [start, end], [1.15, 1.3]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  const number = (index + 1).toString().padStart(2, "0");
  const totalLabel = total.toString().padStart(2, "0");

  const [imgFailed, setImgFailed] = React.useState(false);

  const techList = project.techstack
    .split("·")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className="absolute inset-0 w-full h-full flex items-center justify-center px-4 md:px-0"
    >
      {/* Blurred background echo of the screenshot */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
        <img
          src={project.image}
          className="w-full h-full object-cover opacity-30 blur-3xl"
          alt=""
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Card */}
      <motion.div
        style={{ scale }}
        className="relative z-10 w-full max-w-6xl bg-white text-black rounded-2xl md:rounded-[28px] p-6 md:p-10 grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-6 md:gap-10 shadow-2xl"
      >
        {/* Screenshot, framed like a browser window so full page reads clearly */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 px-3 py-2.5 bg-neutral-100 rounded-t-xl border border-neutral-200 border-b-0">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          </div>
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-b-xl border border-neutral-200 bg-neutral-50">
            {!imgFailed ? (
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400 font-sans text-xs uppercase tracking-widest">
                Preview unavailable
              </div>
            )}
          </div>
        </div>

        {/* Meta panel */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans font-black text-sm tracking-[0.15em] text-black/50">
                {number} / {totalLabel}
              </span>
              <span className="font-sans font-black text-[10px] tracking-[0.2em] uppercase text-black/50">
                {project.year}
              </span>
            </div>

            <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight leading-none mb-2">
              {project.title}
            </h3>

            <p className="font-sans font-bold text-[11px] tracking-[0.15em] uppercase text-black/60 mb-4">
              {project.category}
            </p>

            {project.description && (
              <p className="font-sans text-sm leading-relaxed text-black/80 mb-5">
                {project.description}
              </p>
            )}

            {/* Tech stack, as icons with a tooltip-style label on hover */}
            <div className="flex flex-wrap gap-2">
              {techList.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <span
                    key={tech}
                    title={tech}
                    className="group relative inline-flex items-center justify-center w-8 h-8 rounded-full border border-black/15 text-black/70 hover:text-black hover:border-black/40 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black text-white text-[10px] font-sans font-bold tracking-wide px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {tech}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-black/10">
            {project.sitelink && (
              <a
                href={project.sitelink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-sans font-black text-xs tracking-[0.1em] uppercase text-black hover:opacity-60 transition-opacity"
              >
                View Live
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-sans font-black text-xs tracking-[0.1em] uppercase text-black/70 hover:text-black transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
            )}
            {!project.sitelink && !project.github && (
              <span className="font-sans font-bold text-xs tracking-[0.1em] uppercase text-black/30">
                Private project
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Exported carousel ---
export function ProjectCarousel() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {PROJECT_DATA.map((project, index) => (
          <ProjectPanel
            key={project.title}
            project={project}
            index={index}
            total={PROJECT_DATA.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}