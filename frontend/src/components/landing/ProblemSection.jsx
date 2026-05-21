import { motion } from "framer-motion";

const problems = [
  "Candidates exaggerate skills and project experience.",
  "Recruiters spend hours manually reviewing resumes.",
  "Technical claims are difficult to verify quickly.",
  "Weak screening creates hiring risk and wasted interviews.",
];

const ProblemSection = () => {
  return (
    <section className="relative bg-[#020617] px-6 py-24 text-white lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            The Hiring Problem
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold leading-tight md:text-5xl">
            Traditional screening is slow, manual, and easy to manipulate.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Modern recruiters need more than resume keywords. They need proof,
            consistency checks, skill validation, and risk signals before
            spending time on interviews.
          </p>
        </motion.div>

        <div className="space-y-5">
          {problems.map((problem, index) => (
            <motion.div
              key={problem}
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-red-400/30 hover:bg-red-400/[0.05]"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
                  {index + 1}
                </div>

                <p className="text-lg leading-8 text-slate-300">{problem}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;