import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        
        {/* Logo */}
        <div
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="flex cursor-pointer items-center gap-2"
        >
          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            HireProof
            <span className="text-cyan-400"> AI</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#ai-screening"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            AI Screening
          </a>

          <a
            href="#pricing"
            className="text-sm font-medium text-gray-300 transition hover:text-white"
          >
            Pricing
          </a>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/register")}
          className="rounded-xl bg-cyan-400 px-4 py-2 text-xs font-semibold text-black transition hover:scale-105 hover:bg-cyan-300 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Get Started
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;