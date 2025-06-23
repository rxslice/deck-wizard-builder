
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  // This would typically come from authentication context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Demo function to toggle between landing page and dashboard
  const handleGetStarted = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <div id="features">
          <FeatureSection />
        </div>
        <div id="process">
          <ProcessSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
