import React from "react";
import { ProjectCarousel } from "./Argent-Loop-Infinite-Slider";
import { motion } from "framer-motion";

const SelectedWork = () => {
  // Animation variants for the text reveal
  const titleVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1], // Smooth custom ease
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: "circOut", delay: 0.2 },
    },
  };

  return (
    <section className="w-full bg-black " id="work">
      {/* Title Section */}
      <div className="h-[60vh] md:h-[80vh] flex flex-col justify-center px-6 md:px-16 lg:px-24">
        

        <div className="relative">
          {/* Main Heading with Mask Reveal */}
          <div className="overflow-hidden">
            <motion.h2
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-white text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85]"
            >
              Selected
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-white text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] ml-12 md:ml-24"
            >
              Works
            </motion.h2>
          </div>

          {/* Decorative Animated Line */}
          <motion.div 
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="h-[1px] w-full bg-white/20 mt-12 origin-left"
          />
        </div>

        {/* Subtle Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-white/40 text-xs md:text-sm uppercase tracking-[0.4em] mt-8 max-w-md"
        >
          Showcasing digital experiences built with precision and purpose.
        </motion.p>
      </div>
      
        <ProjectCarousel />
    </section>
  );
};

export default SelectedWork;