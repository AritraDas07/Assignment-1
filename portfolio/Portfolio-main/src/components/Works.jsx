"use client";
import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "./hoc";
import { projects } from "../constants/constants";
import { fadeIn, textVariant } from "../utils/motion";
import { HiLink } from "react-icons/hi";
import { ImGithub } from "react-icons/im";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  features,
  live_link,
}) => {
  const isEven = index % 2 === 0;
  const isFeatured = index === 0;

  const refLiveLink = React.useRef(null);
  const refSourceCodeLink = React.useRef(null);
  const [positionLiveLink, setPositionLiveLink] = React.useState({ x: 0, y: 0 });
  const [positionSourceCodeLink, setPositionSourceCodeLink] = React.useState({ x: 0, y: 0 });

  const onMouseMoveLiveLink = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = refLiveLink.current.getBoundingClientRect();
    setPositionLiveLink({ x: clientX - (left + width / 2), y: clientY - (top + height / 2) });
  };

  const onMouseMoveSourceCodeLink = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = refSourceCodeLink.current.getBoundingClientRect();
    setPositionSourceCodeLink({ x: clientX - (left + width / 2), y: clientY - (top + height / 2) });
  };

  const onMouseLeave = () => {
    setPositionLiveLink({ x: 0, y: 0 });
    setPositionSourceCodeLink({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="project-card relative"
    >
      {isFeatured && <div className="featured-label">⭐ Featured</div>}

      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
        {/* Project Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-2xl group cursor-pointer" style={{ aspectRatio: '16/9' }}>
            <img
              src={image.src}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Project Info */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-white font-bold text-[28px] mb-3">{name}</h3>
          <p className="text-secondary text-[16px] leading-[1.7] mb-4">{description}</p>

          {/* Features */}
          <ul className="space-y-2 mb-5">
            {features.map((feature, idx) => (
              <li key={idx} className="text-secondary text-sm flex items-start gap-2">
                <span className="text-[#915EFF] mt-1 text-xs">●</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span key={tag.name} className="tag-pill">
                {tag.name}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.div
              ref={refLiveLink}
              onMouseMove={onMouseMoveLiveLink}
              onMouseLeave={onMouseLeave}
              animate={{ x: positionLiveLink.x, y: positionLiveLink.y }}
              transition={{ type: "spring", stiffness: 130, damping: 50, mass: 0.1 }}
            >
              <button
                onClick={() => window.open(live_link, "_blank")}
                className="icon-btn"
                title="Live Demo"
              >
                <HiLink size={20} />
              </button>
            </motion.div>

            <motion.div
              ref={refSourceCodeLink}
              onMouseMove={onMouseMoveSourceCodeLink}
              onMouseLeave={onMouseLeave}
              animate={{ x: positionSourceCodeLink.x, y: positionSourceCodeLink.y }}
              transition={{ type: "spring", stiffness: 130, damping: 50, mass: 0.1 }}
            >
              <button
                onClick={() => window.open(source_code_link, "_blank")}
                className="icon-btn"
                title="Source Code"
              >
                <ImGithub size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <div className="relative">
        <div>
          <span id="work" className={styles.sectionPill}>My work</span>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
          <div className="purple-underline" />
        </div>

        <div className="w-full flex">
          <motion.p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]" style={{ lineHeight: '1.8' }}>
            Following projects showcase my skills and experience through
            real-world examples of my work. Each project is briefly described
            with links to code repositories and live demos in it. It reflects my
            ability to solve complex problems, work with different technologies,
            and manage projects effectively.
          </motion.p>
          {/* Radial glow replacing color_sharp */}
          <div className="section-glow section-glow-left" />
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
