import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import RecommendedTutors from "@/components/RecommendedTutors";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingAI from "@/components/FloatingAI";

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <Hero />
      <HowItWorks />
      <RecommendedTutors />
      <Testimonials />
      <FAQ />
      <Footer />
      <FloatingAI />
    </div>
  );
}
