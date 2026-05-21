import { motion } from "framer-motion";

const AuthButton = ({ text, type = "submit", loading = false }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      type={type}
      disabled={loading}
      className="flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Please wait..." : text}
    </motion.button>
  );
};

export default AuthButton;