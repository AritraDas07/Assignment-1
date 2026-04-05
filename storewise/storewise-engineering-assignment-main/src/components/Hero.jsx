import { memo, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useIntro } from "./IntroWrapper";
import { EarthCanvas } from "./canvas";

const Hero = memo(function Hero() {
  const { introComplete } = useIntro();
  const slider = useRef(null);
  const firstText = useRef(null);
  const secondText = useRef(null);
  const xPercentRef = useRef(0);
  const directionRef = useRef(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.5,
          start: 0,
          end: window.innerHeight,
          onUpdate: (e) => (directionRef.current = e.direction * -1),
        },
        x: "-500px",
      });
    });

    let animationId;
    const animate = () => {
      if (xPercentRef.current < -100) {
        xPercentRef.current = 0;
      } else if (xPercentRef.current > 0) {
        xPercentRef.current = -100;
      }
      if (firstText.current && secondText.current) {
        gsap.set(firstText.current, { xPercent: xPercentRef.current });
        gsap.set(secondText.current, { xPercent: xPercentRef.current });
      }
      xPercentRef.current += 0.1 * directionRef.current;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className={`relative z-[1] w-full h-[60vh] max-h-[600px] min-h-[400px] mx-auto overflow-hidden`}>
      {/* Background with Stars */}

      <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none', backgroundImage: 'url(/banner-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, zIndex: -2 }}>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={introComplete ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`absolute inset-0 sm:top-[120px] top-[100px] max-w-[1280px] mx-auto px-6 sm:px-16 flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={introComplete ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-5 h-5 rounded-full bg-[var(--accent)]"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={introComplete ? { height: "auto" } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-1 sm:h-40 h-20"
            style={{ background: 'linear-gradient(-90deg, #804dee 0%, rgba(60, 51, 80, 0) 100%)' }}
          />
        </div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`font-black lg:text-[70px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[80px] mt-2 text-white tracking-[-0.02em]`}
          >
            Manage Your <br className="hidden sm:block" />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={introComplete ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent-cyan)] to-[var(--accent-light)] lg:text-[80px] font-black inline-block mt-2"
            >
              Workflow
            </motion.span>
          </motion.h1>
          
          <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-4 text-[var(--text-secondary)] max-w-lg text-[16px] sm:text-[18px]"
          >
            Organize tasks, boost productivity, and get things done with the modern task management platform.
          </motion.p>
        </div>
      </motion.div>

      {/* Floating Earth Model replacing floating badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={introComplete ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute right-[-100px] md:right-10 top-[20%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] z-[-1]"
        style={{ pointerEvents: 'auto' }}
      >
        <EarthCanvas />
      </motion.div>

      {/* GSAP Slider tailored for Task App */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={introComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-10 left-0 w-full overflow-hidden md:z-[-10]"
      >
        <div
          ref={slider}
          className="flex whitespace-nowrap font-black opacity-[0.04] text-[60px] lg:text-[140px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <p ref={firstText} className="pr-[50px] m-0">Task Management App.</p>
          <p ref={secondText} className="pr-[50px] m-0">Task Management App.</p>
        </div>
      </motion.div>

    </section>
  );
});

export default Hero;
