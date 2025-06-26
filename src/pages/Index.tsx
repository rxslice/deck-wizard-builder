
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-financial-gold"></div>
      </div>
    );
  }

  // Show dashboard if user is authenticated
  if (user) {
    return <Dashboard />;
  }

  // Show landing page for unauthenticated users
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
