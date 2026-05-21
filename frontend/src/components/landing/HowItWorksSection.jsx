import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Upload candidate profile",
    description:
      "Recruiters upload resumes, portfolio links, GitHub profiles, or candidate details into HireProof AI.",
  },
  {
    number: "02",
    title: "AI checks candidate claims",
    description:
      "The platform analyzes resume claims, experience consistency, project credibility, and skill relevance.",
  },
  {
    number: "03",
    title: "Generate trust intelligence",
    description:
      "HireProof AI creates trust scores, risk signals, skill insights, and recruiter-ready evaluation summaries.",
  },
  {
    number: "04",
    title: "Shortlist with confidence",
    description:
      "Recruiters make faster decisions using proof-based insights instead of relying only on resumes.",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#020617] px-6 py-28 text-white lg:px-10"
    >
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            How It Works
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold leading-tight md:text-5xl">
            From resume upload to confident hiring decisions.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            HireProof AI transforms unverified candidate information into
            clear, structured, recruiter-ready hiring intelligence.
          </p>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/[0.05]"
            >
              <span className="text-5xl font-extrabold text-cyan-400/25">
                {step.number}
              </span>

              <h3 className="mt-8 text-2xl font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-5 leading-8 text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;