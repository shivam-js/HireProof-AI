import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const headlineWords = [
    "Verify",
    "candidates",
    "faster",
    "with",
  ];

  const heroSectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroCardRef = useRef(null);

  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroTextRef.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      heroCardRef.current,
      {
        opacity: 0,
        scale: 0.9,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      }
    );

    gsap.to(heroCardRef.current, {
      y: "-=12",
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const section =
      heroSectionRef.current;

    const handleMouseMove = (e) => {
      const rect =
        section.getBoundingClientRect();

      const x =
        e.clientX -
        rect.left -
        rect.width / 2;

      const y =
        e.clientY -
        rect.top -
        rect.height / 2;

      gsap.to(heroCardRef.current, {
        rotateY: x * 0.015,
        rotateX: y * -0.015,
        x: x * 0.02,
        y: y * 0.02,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    section.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      section.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };

  }, []);

  const handleMagneticMove = (
    e,
    ref
  ) => {
    const bounds =
      ref.current.getBoundingClientRect();

    const x =
      e.clientX -
      bounds.left -
      bounds.width / 2;

    const y =
      e.clientY -
      bounds.top -
      bounds.height / 2;

    gsap.to(ref.current, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (
    ref
  ) => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };



  return (
    <section
      ref={heroSectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#020617] px-6 pt-28 text-white lg:px-10"
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <div className="absolute right-10 top-40 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

      <motion.div
        animate={{
          x: [-120, 120, -120],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-0 h-[2px] w-[70%] rotate-[-8deg] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          ref={heroTextRef}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        > 
          <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            AI-powered hiring intelligence for modern recruiters
          </p>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {headlineWords.map(
              (word, index) => (
                <motion.span
                  key={word}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    delay:
                      index * 0.12,
                  }}
                  className="mr-4 inline-block"
                >
                  {word}
                </motion.span>
              )
            )}

            <span className="inline-block">
              <motion.span
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.55,
                }}
                className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent"
              >
                AI-driven proof
              </motion.span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            HireProof AI helps recruiters screen resumes, validate technical
            skills, detect fake claims, and shortlist trustworthy candidates
            with recruiter-grade confidence.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button
              ref={primaryBtnRef}
              onClick={() =>
                navigate("/dashboard")
              }
              onMouseMove={(e) =>
                handleMagneticMove(
                  e,
                  primaryBtnRef
                )
              }
              onMouseLeave={() =>
                handleMagneticLeave(
                  primaryBtnRef
                )
              }
              className="rounded-2xl bg-cyan-400 px-7 py-4 font-semibold text-black shadow-lg shadow-cyan-500/25 transition hover:scale-105 hover:bg-cyan-300"
            >
              Start Screening
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              View Platform
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
            >
              Resume Intelligence
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
            >
              Skill Verification
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("ai-screening")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
            >
              Fraud Detection
            </button>
          </div>
        </motion.div>

        <motion.div
          ref={heroCardRef}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#020617] p-4 sm:p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Candidate Trust Score</p>
                  <h3 className="text-3xl font-bold text-white">92%</h3>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                  Verified
                </span>
              </div>

              <div className="space-y-4">
                {[
                  ["Resume Match", "94%"],
                  ["Technical Skill Proof", "89%"],
                  ["Claim Consistency", "96%"],
                  ["Risk Signals", "Low"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4"
                  >
                    <span className="text-slate-300">{label}</span>
                    <span className="font-semibold text-cyan-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;