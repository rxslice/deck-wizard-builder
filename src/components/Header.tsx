
import { Button } from "@/components/ui/button";
import { TrendingUp, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-financial-blue rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-financial-gold" />
              </div>
              <span className="text-xl font-bold text-financial-navy">ValuationDeck</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/features')} 
              className="text-slate-600 hover:text-financial-navy transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => navigate('/templates')} 
              className="text-slate-600 hover:text-financial-navy transition-colors"
            >
              Templates
            </button>
            <button 
              onClick={() => navigate('/documentation')} 
              className="text-slate-600 hover:text-financial-navy transition-colors"
            >
              Docs
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className="text-slate-600 hover:text-financial-navy transition-colors"
            >
              Contact
            </button>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-financial-navy"
              onClick={() => navigate('/contact')}
            >
              Get Help
            </Button>
            <Button 
              className="bg-financial-blue hover:bg-financial-blue-light text-white"
              onClick={() => navigate('/')}
            >
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
              <button 
                onClick={() => { navigate('/features'); setIsMenuOpen(false); }} 
                className="text-slate-600 hover:text-financial-navy transition-colors text-left"
              >
                Features
              </button>
              <button 
                onClick={() => { navigate('/templates'); setIsMenuOpen(false); }} 
                className="text-slate-600 hover:text-financial-navy transition-colors text-left"
              >
                Templates
              </button>
              <button 
                onClick={() => { navigate('/documentation'); setIsMenuOpen(false); }} 
                className="text-slate-600 hover:text-financial-navy transition-colors text-left"
              >
                Documentation
              </button>
              <button 
                onClick={() => { navigate('/contact'); setIsMenuOpen(false); }} 
                className="text-slate-600 hover:text-financial-navy transition-colors text-left"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                <Button 
                  variant="ghost" 
                  className="text-financial-navy justify-start"
                  onClick={() => { navigate('/contact'); setIsMenuOpen(false); }}
                >
                  Get Help
                </Button>
                <Button 
                  className="bg-financial-blue hover:bg-financial-blue-light text-white justify-start"
                  onClick={() => { navigate('/'); setIsMenuOpen(false); }}
                >
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
