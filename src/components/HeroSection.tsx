
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap, Download } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white py-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 mb-6 text-sm bg-financial-gold/20 text-financial-gold-light rounded-full border border-financial-gold/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trusted by 500+ Financial Professionals
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              From Excel Model to 
              <span className="bg-gradient-to-r from-financial-gold to-financial-gold-light bg-clip-text text-transparent">
                {" "}Investment Deck
              </span>
              <br />in 90 Seconds
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Transform your financial models into professional PowerPoint presentations instantly. 
              All processing happens securely in your browser—your sensitive data never leaves your device.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Building Your Deck
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-financial-gold" />
                Client-Side Processing
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1 text-financial-gold" />
                90-Second Generation
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in animation-delay-300">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-4">
                <div className="h-4 bg-financial-gold/40 rounded w-3/4"></div>
                <div className="h-4 bg-white/30 rounded w-1/2"></div>
                <div className="h-32 bg-gradient-to-br from-financial-gold/20 to-white/10 rounded-lg"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-white/20 rounded"></div>
                  <div className="h-20 bg-financial-gold/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
