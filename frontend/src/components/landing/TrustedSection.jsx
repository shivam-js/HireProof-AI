import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  {
    value: "98%",
    label: "Resume Verification Accuracy",
  },
  {
    value: "4x",
    label: "Faster Candidate Screening",
  },
  {
    value: "85%",
    label: "Reduction in Fake Claims",
  },
  {
    value: "10k+",
    label: "AI Evaluations Processed",
  },
];

const CountUp = ({
  end,
  suffix = "",
}) => {
  const ref = useRef(null);

  const isInView =
    useInView(ref, {
      once: true,
      amount: 0.5,
    });

  const [count, setCount] =
    useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;

    const duration = 1800;

    const increment =
      end /
      (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(
          Math.floor(start)
        );
      }
    }, 16);

    return () =>
      clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const TrustedSection = () => {
  const [spotlight, setSpotlight] =
    useState({
      x: 0,
      y: 0,
    });

    const handleMouseMove = (
      e
    ) => {
      const rect =
        e.currentTarget.getBoundingClientRect();

      setSpotlight({
        x:
          e.clientX - rect.left,
        y:
          e.clientY - rect.top,
      });
    };
  return (
    <section
      onMouseMove={
        handleMouseMove
      }
      className="relative overflow-hidden border-t border-white/10 bg-[#020617] px-6 py-24 lg:px-10"
    >
      <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 bg-cyan-500/10 blur-3xl" />

      <motion.div
        animate={{
          left:
            spotlight.x -
            180,
          top:
            spotlight.y -
            180,
        }}
        transition={{
          duration: 0.15,
          ease: "linear",
        }}
        className="pointer-events-none absolute h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Trusted Hiring Intelligence
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white md:text-5xl">
            Recruit with confidence using AI verification
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            HireProof AI helps recruiters reduce hiring risks, detect resume
            fraud, and validate technical candidates faster with intelligent
            screening systems.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]"
            >
              <h3 className="text-5xl font-extrabold text-cyan-300">
                {index === 0 && (
                  <CountUp
                    end={98}
                    suffix="%"
                  />
                )}

                {index === 1 && (
                  <CountUp
                    end={4}
                    suffix="x"
                  />
                )}

                {index === 2 && (
                  <CountUp
                    end={85}
                    suffix="%"
                  />
                )}

                {index === 3 && (
                  <CountUp
                    end={10}
                    suffix="k+"
                  />
                )}
              </h3>

              <p className="mt-5 text-base leading-7 text-slate-300">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;