import { motion } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";

const features = [
  {
    title: "Resume Intelligence",
    description:
      "Analyze resumes using AI to detect strong matches, missing skills, and suspicious claims instantly.",
  },
  {
    title: "Skill Verification",
    description:
      "Validate technical skills through AI-driven evaluation systems and consistency analysis.",
  },
  {
    title: "Fraud Detection",
    description:
      "Identify fake projects, exaggerated experience, and suspicious hiring patterns automatically.",
  },
  {
    title: "Recruiter Analytics",
    description:
      "Track candidate quality, screening accuracy, and hiring insights with real-time dashboards.",
  },
  {
    title: "Risk Scoring",
    description:
      "Generate trust scores and hiring confidence indicators before interviews begin.",
  },
  {
    title: "Smart Shortlisting",
    description:
      "Prioritize the most trustworthy and technically aligned candidates faster using AI ranking.",
  },
];

const FeaturesSection = () => {
  const cardRefs = useRef([]);

  const handleMouseEnter = (index) => {
    gsap.to(cardRefs.current[index], {
      y: -10,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(cardRefs.current[index], {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#020617] px-6 py-28 text-white lg:px-10"
    >
      <div className="absolute left-0 top-20 h-72 w-72 bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-0 top-40 h-72 w-72 bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Platform Features
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold leading-tight md:text-5xl">
            Everything recruiters need to verify candidates intelligently.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            HireProof AI combines AI screening, resume intelligence, fraud
            analysis, and trust scoring into one powerful hiring platform.
          </p>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              ref={(el) =>
                (cardRefs.current[index] = el)
              }
              onMouseEnter={() =>
                handleMouseEnter(index)
              }
              onMouseLeave={() =>
                handleMouseLeave(index)
              }
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05]"
            >
              <div className="absolute right-0 top-0 h-32 w-32 bg-cyan-400/5 blur-3xl transition group-hover:bg-cyan-400/10" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl font-bold text-cyan-300">
                {index + 1}
              </div>

              <h3 className="text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-5 leading-8 text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

