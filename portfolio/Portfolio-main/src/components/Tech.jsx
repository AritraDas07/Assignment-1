"use client";
import React from "react";

import { SectionWrapper } from "./hoc";
import { technologies } from "../constants/constants";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import Skills from "./Skills";

const Tech = () => {
  return (
    <>
      <div className="relative">
        <motion.div variants={textVariant()}>
          <span className={styles.sectionPill}>Tech</span>
          <h2 className={styles.sectionHeadText}>
            Skills.
          </h2>
          <div className="purple-underline" />
        </motion.div>
        {/* Radial glow replacing color_sharp */}
        <div className="section-glow section-glow-left" />
      </div>

      {/* Responsive grid: 6 cols desktop, 4 tablet, 3 mobile */}
      <div className="mt-12 relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 justify-items-center">
        {technologies.map((technology, index) => (
          <div className="w-[80px] h-[80px]" key={technology.name}>
            <Skills
              name={technology.name}
              icon={technology.icon}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Video background */}
      <div className="w-full h-full absolute top-10 flex flex-col items-center justify-center">
        <div className="w-[1000px] 1000:w-full h-full z-[-10] opacity-[0.3] absolute flex flex-col bg-cover items-center justify-center">
          <video
            className="w-full h-auto"
            preload="none"
            playsInline
            loop
            muted
            autoPlay
            loading="lazy"
            src="/cards-video.webm"
          ></video>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
