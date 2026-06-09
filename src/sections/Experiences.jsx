import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    role: "Web Developer",
    company: "Jamia Academy",
    duration: "2026",
    description:
      "I have 6 months of teaching experience at Jamia Academy, where I taught web development and computer fundamentals to 5 students. During this time, I helped students build a strong foundation in programming concepts and practical development skills.",
  },
  {
    role: "Personal Projects",
    company: "Self",
    duration: "6+ build project",
    description: "Built responsive web applications and personal projects, Skilled in modern frontend and full-stack development technologies.",
  },
  {
    role: "Full Stack",
    company: "Jamia Academy",
    duration: "1+ months",
    description:
      `eveloped a high-performance, fully responsive institute website featuring smooth scrolling, modern animations, and an optimized user experience. Focused on performance, responsiveness, and clean, maintainable code and  here is link https://www.jamiaacademy.in/`,
        
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  // ✅ Desktop ke liye y animation
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 30 : -30, 0]
  );

  // ✅ Mobile ke liye x animation
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // ✅ DESKTOP LAYOUT
  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}
        >
          <motion.article
            className={`absolute left-1/2 -translate-x-1/2 ${
              idx % 2 === 0 ? "bottom-12" : "top-12"
            } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
            style={{ opacity, y }}  
          >
            <h3 className="text-xl font-semibold">{exp.role}</h3>
            <p className="text-base text-gray-400 mb-3"> {/* ✅ text-base */}
              {exp.company} | {exp.duration}
            </p>
            <p className="text-base text-gray-300 break-words"> {/* ✅ break-words */}
              {exp.description}
            </p>
          </motion.article>
        </motion.div>
      </div>
    );
  }

  // ✅ MOBILE LAYOUT
  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale, opacity }}
      />

      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity, x }}  // ✅ x use kiya mobile mein
      >
        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

export default function Experiences() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // ✅ experiences dependency add kiya
  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    [experiences]
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">

            {/* ✅ DESKTOP */}
            {!isMobile && (
              <div className="relative w-full max-w-7xl ">
                <div className="relative h-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 h-[6px] bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"  // ✅ desktop
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ✅ MOBILE — Fixed structure */}
            {isMobile && (
              <div className="relative w-full max-w-md">

                {/* ✅ Line — alag div */}
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                    style={{ height: lineSize }}
                  />
                </div>

                {/* ✅ Cards — alag div */}
                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"  // ✅ mobile
                    />
                  ))}
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}