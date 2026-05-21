import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#020617] px-6 pt-28 text-white lg:px-10">
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-10 top-40 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            AI-powered hiring intelligence for modern recruiters
          </p>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Verify candidates faster with{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              AI-driven proof
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            HireProof AI helps recruiters screen resumes, validate technical
            skills, detect fake claims, and shortlist trustworthy candidates
            with recruiter-grade confidence.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-2xl bg-cyan-400 px-7 py-4 font-semibold text-black shadow-lg shadow-cyan-500/25 transition hover:scale-105 hover:bg-cyan-300">
              Start Screening
            </button>

            <button className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10">
              View Platform
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            <span>Resume Intelligence</span>
            <span>Skill Verification</span>
            <span>Fraud Detection</span>
          </div>
        </motion.div>

        <motion.div
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