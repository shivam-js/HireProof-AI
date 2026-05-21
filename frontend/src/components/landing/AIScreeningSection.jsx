import { motion } from "framer-motion";

const signals = [
  ["Resume Match", "94%", "Strong"],
  ["Skill Proof", "89%", "Verified"],
  ["Project Credibility", "91%", "Consistent"],
  ["Risk Level", "Low", "Safe"],
];

const AIScreeningSection = () => {
  return (
    <section
      id="ai-screening"
      className="relative overflow-hidden bg-[#020617] px-6 py-28 text-white lg:px-10"
    >
      <div className="absolute right-0 top-20 h-80 w-80 bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            AI Screening Engine
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold leading-tight md:text-5xl">
            Turn candidate information into proof-based hiring intelligence.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            HireProof AI analyzes resumes, technical claims, project details,
            and hiring risk signals to help recruiters identify reliable
            candidates faster.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              Resume Analysis
            </span>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              Skill Validation
            </span>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              Fraud Signals
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-5"
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-[#020617] p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">AI Candidate Report</p>
                <h3 className="mt-1 text-3xl font-bold">Aarav Sharma</h3>
              </div>

              <div className="rounded-2xl bg-emerald-400/10 px-4 py-3 text-right">
                <p className="text-xs text-emerald-300">Trust Score</p>
                <p className="text-2xl font-bold text-emerald-300">92%</p>
              </div>
            </div>

            <div className="space-y-4">
              {signals.map(([label, value, status]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-semibold text-cyan-300">{value}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className="text-emerald-300">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIScreeningSection;