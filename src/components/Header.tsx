
import { Button } from "@/components/ui/button";
import { TrendingUp, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-financial-blue rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-financial-gold" />
              </div>
              <span className="text-xl font-bold text-financial-navy">ValuationDeck</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-financial-navy transition-colors">
              Features
            </a>
            <a href="#process" className="text-slate-600 hover:text-financial-navy transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-financial-navy transition-colors">
              Pricing
            </a>
            <a href="#support" className="text-slate-600 hover:text-financial-navy transition-colors">
              Support
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-financial-navy">
              Sign In
            </Button>
            <Button className="bg-financial-blue hover:bg-financial-blue-light text-white">
              Get Started
            </Button>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-financial-navy" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-slate-600 hover:text-financial-navy transition-colors">
                Features
              </a>
              <a href="#process" className="text-slate-600 hover:text-financial-navy transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-financial-navy transition-colors">
                Pricing
              </a>
              <a href="#support" className="text-slate-600 hover:text-financial-navy transition-colors">
                Support
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                <Button variant="ghost" className="text-financial-navy justify-start">
                  Sign In
                </Button>
                <Button className="bg-financial-blue hover:bg-financial-blue-light text-white justify-start">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
