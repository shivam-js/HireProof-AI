import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#020617] px-6 py-28 text-white lg:px-10"
    >
      <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl rounded-[2rem] border border-cyan-400/20 bg-white/[0.05] px-8 py-16 text-center shadow-2xl shadow-cyan-500/10 backdrop-blur-xl md:px-14"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Start Hiring Smarter
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold leading-tight md:text-6xl">
          Build a more trusted hiring pipeline with HireProof AI.
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Screen candidates faster, detect weak claims earlier, and make
          recruiter-ready decisions with AI-powered verification.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-2xl bg-cyan-400 px-8 py-4 font-semibold text-black shadow-lg shadow-cyan-500/25 transition hover:scale-105 hover:bg-cyan-300">
            Get Started Free
          </button>

          <button className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
            Request Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;