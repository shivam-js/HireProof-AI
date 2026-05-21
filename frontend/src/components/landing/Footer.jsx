const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020617] px-6 py-10 text-white lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 text-center md:flex-row md:text-left">
        
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            HireProof
            <span className="text-cyan-400"> AI</span>
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            AI-powered candidate verification platform.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 md:justify-start">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition hover:text-white">
            How It Works
          </a>

          <a href="#ai-screening" className="transition hover:text-white">
            AI Screening
          </a>

          <a href="#pricing" className="transition hover:text-white">
            Pricing
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-500">
          © 2026 HireProof AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;