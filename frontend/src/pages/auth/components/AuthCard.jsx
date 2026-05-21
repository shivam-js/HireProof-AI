import { motion } from "framer-motion";

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
    >
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          HireProof AI
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </motion.div>
  );
};

export default AuthCard;