import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillItem {
  name: string;
  url: string;
}

interface SkillCategory {
  link: string;
  text: string;
  items: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    link: "#",
    text: "Languages",
    items: [
      {
        name: "JavaScript",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Python",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "C++",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "HTML5",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
    ],
  },
  {
    link: "#",
    text: "Frontend",
    items: [
      {
        name: "React",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Tailwind CSS",
        url: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      },
      {
        name: "Bootstrap",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
      {
        name: "Framer Motion",
        url: "https://cdn.simpleicons.org/framer/0055FF",
      },
      { name: "GSAP", url: "https://cdn.simpleicons.org/greensock/88CE02" },
    ],
  },
  {
    link: "#",
    text: "Backend & Database",
    items: [
      {
        name: "Node.js",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "MongoDB",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Supabase",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      },
      {
        name: "SQL Server",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
      },
      {
        name: "MySQL",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
    ],
  },
  {
    link: "#",
    text: "AI / Machine Learning",
    items: [
      { name: "RAG", url: "https://cdn.simpleicons.org/openai" },
      {
        name: "LangChain",
        url: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/langchain-color.png",
      },
      {
        name: "LangGraph",
        url: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/langgraph-color.png",
      },
      {
        name: "Scikit-Learn",
        url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
      },
      {
        name: "Pandas",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      },
      {
        name: "NumPy",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
      },
    ],
  },
  {
    link: "#",
    text: "Developer Tools",
    items: [
      {
        name: "Git",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "VS Code",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Postman",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      },
      {
        name: "Jupyter",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
      },
      {
        name: "Google Colab",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const SkillPhilosophy = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  return (
    <section className="w-full min-h-screen bg-white text-black font-sans px-6 md:px-12 lg:px-20 py-16 flex flex-col justify-between select-none">
      {/* --- Top Header & Philosophy Section --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-8 pb-12 border-b border-gray-200"
      >
        <motion.div variants={itemVariants} className="md:col-span-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            [PHILOSOPHY & SKILLS]
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{duration: 1}}
          className="md:col-span-9 space-y-6"
        >
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-light leading-snug tracking-tight">
            Building{" "}
            <span className="font-normal underline decoration-1 underline-offset-8">
              scalable products
            </span>{" "}
            with modern web technologies and AI.
          </h3>

          <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-2xl">
            Focused on performance, intuitive experiences, and intelligent
            solutions.
          </p>
        </motion.div>
      </motion.div>

      {/* --- Interactive Skills Breakdown Section --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12"
      >
        {/* Category Selector List */}
        <div className="md:col-span-5 space-y-2">
          {skillCategories.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <motion.div
                key={cat.text}
                variants={itemVariants}
                onMouseEnter={() => setActiveCategoryIndex(idx)}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`group relative flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-neutral-100 text-neutral-800"
                }`}
              >
                <div className="flex items-center space-x-4 z-10">
                  <span
                    className={`font-mono text-xs ${isActive ? "text-neutral-400" : "text-neutral-400"}`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-lg md:text-xl font-medium tracking-wide">
                    {cat.text}
                  </span>
                </div>

                <span
                  className={`text-xs font-mono uppercase tracking-widest ${isActive ? "text-neutral-400" : "text-neutral-400 group-hover:text-black"}`}
                >
                  {cat.items.length} Tech
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Preview Grid */}
        <div className="md:col-span-7 bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-200/80 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex justify-between items-center pb-6 mb-6 border-b border-neutral-200">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Active Category // {skillCategories[activeCategoryIndex].text}
              </h4>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {skillCategories[activeCategoryIndex].items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-neutral-200/60 transition-shadow hover:shadow-md"
                  >
                    <div className="w-8 h-8 flex items-center justify-center p-1 bg-neutral-50 rounded-lg flex-shrink-0">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback handling if icon fails to fetch
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-neutral-800 truncate">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-8 text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Hover categories to inspect tech stack
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SkillPhilosophy;
