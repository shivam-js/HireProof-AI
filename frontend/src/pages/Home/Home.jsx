import Navbar from "../../components/landing/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import TrustedSection from "../../components/landing/TrustedSection";
import ProblemSection from "../../components/landing/ProblemSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import HowItWorksSection from "../../components/landing/HowItWorksSection";
import AIScreeningSection from "../../components/landing/AIScreeningSection";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/landing/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <HeroSection />
      <TrustedSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AIScreeningSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Home;