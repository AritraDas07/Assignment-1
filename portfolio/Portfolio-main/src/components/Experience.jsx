"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

const VerticalTimeline = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimeline
    ),
  { ssr: false }
);

const VerticalTimelineElement = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimelineElement
    ),
  { ssr: false }
);

import { styles } from "../styles";
import { experiences } from "../constants/constants";
import { SectionWrapper } from "./hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#0f0c24",
        color: "#fff",
        border: "1px solid rgba(124, 58, 237, 0.2)",
        borderRadius: "16px",
        boxShadow: "none",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(124, 58, 237, 0.3)" }}
      date={experience.date}
      iconStyle={{
        background: "#151030",
        boxShadow: "0 0 0 4px #7c3aed, inset 0 2px 0 rgba(0,0,0,0.08), 0 3px 0 4px rgba(0,0,0,0.05)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon?.src || experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[22px] font-bold">{experience.title}</h3>
        <p
          className="text-[#915EFF] text-[15px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-none ml-0 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-4 tracking-wider relative"
          >
            <span className="absolute left-0 top-[6px] w-2 h-2 rounded-full bg-[#7c3aed]" />
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <span className={styles.sectionPill}>What I have done so far</span>
        <h2 className={`${styles.sectionHeadText}`}>
          Work Experience.
        </h2>
        <div className="purple-underline" />
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
