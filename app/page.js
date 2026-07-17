import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import RecommendedTutors from "@/components/RecommendedTutors";

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <Hero />
      <HowItWorks />
      <RecommendedTutors />
    </div>
  );
}
