'use client'
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../constants/constants"
import { SectionWrapper } from "./hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
import Image from "next/image";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='w-full sm:w-[220px]'
    glareEnable={true} glareMaxOpacity={0.4} glareColor="#915EFF" glarePosition="bottom" glareBorderRadius="16px"
    tiltMaxAngleX={20} tiltMaxAngleY={20} tiltEnable={true} perspective={1000}
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full glass-card p-[1px] rounded-2xl'
    >
      <div
        className='bg-surface-card rounded-2xl py-6 px-8 min-h-[220px] flex justify-evenly items-center flex-col'
      >
        <Image
          src={icon}
          alt={title}
          className='w-14 h-14 object-contain'
        />

        <h3 className='text-white text-[17px] font-bold text-center mt-4'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <div className='relative overflow-hidden lg:overflow-visible'>
        {/* Radial glow replacing color_sharp */}
        <div className="section-glow section-glow-left" />

        <div className="lg:flex lg:gap-16 lg:items-start">
          {/* Left: Text content */}
          <div className="lg:flex-1">
            <motion.div variants={textVariant()}>
              <span className={styles.sectionPill}>Introduction</span>
              <h2 className={styles.sectionHeadText}>
                Overview.
              </h2>
              <div className="purple-underline" />
            </motion.div>
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className='mt-6 text-secondary text-[17px] max-w-3xl leading-[30px]'
              style={{ lineHeight: '1.8' }}
            >
              I&apos;m a skilled software developer with experience in TypeScript and
              JavaScript, and expertise in frameworks like React, Node.js, and
              Three.js. I&apos;m a quick learner and collaborate closely with clients to
              create efficient, scalable, and user-friendly solutions that solve
              real-world problems. Let&apos;s work together to bring your ideas to life!
            </motion.p>
          </div>

          {/* Right: Service cards (desktop only) */}
          <div className='mt-12 lg:mt-0 flex-wrap justify-center gap-6 hidden md:flex lg:flex-col lg:gap-4 xl:flex-row'>
            {services.map((service, index) => (
              <ServiceCard key={service.title} index={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
