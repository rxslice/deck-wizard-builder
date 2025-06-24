import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Zap, Download, Play, ArrowRight } from "lucide-react";
export default function HeroSection() {
  return <section className="hero-gradient text-white py-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="inline-flex items-center px-4 py-2 mb-6 text-sm bg-financial-gold/20 text-financial-gold-light rounded-full border border-financial-gold/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trusted by 500+ Financial Professionals
            </Badge>
            
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
              <Button size="lg" className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                Start Building Your Deck
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 px-8 py-4 rounded-lg text-white hover:text-white bg-gray-600 hover:bg-gray-500">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo (2 min)
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-financial-gold" />
                <div>
                  <div className="font-medium">100% Private</div>
                  <div className="text-slate-400 text-xs">Client-side only</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-financial-gold" />
                <div>
                  <div className="font-medium">90 Seconds</div>
                  <div className="text-slate-400 text-xs">Average generation</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-financial-gold" />
                <div>
                  <div className="font-medium">Bank Grade</div>
                  <div className="text-slate-400 text-xs">Professional output</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in animation-delay-300">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                {/* Mock file upload */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-financial-gold/30 rounded-lg flex items-center justify-center">
                    <Download className="w-4 h-4 text-financial-gold" />
                  </div>
                  <div>
                    <div className="h-3 bg-white/40 rounded w-32"></div>
                    <div className="h-2 bg-white/20 rounded w-20 mt-1"></div>
                  </div>
                </div>
                
                {/* Mock progress */}
                <div className="space-y-2">
                  <div className="h-2 bg-financial-gold/60 rounded-full"></div>
                  <div className="text-xs text-financial-gold">Processing: 100% Complete</div>
                </div>
                
                {/* Mock slides preview */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/20 rounded-lg p-3 border border-white/30">
                    <div className="h-16 bg-gradient-to-br from-financial-gold/30 to-white/20 rounded mb-2"></div>
                    <div className="h-2 bg-white/40 rounded w-3/4"></div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 border border-white/30">
                    <div className="h-16 bg-gradient-to-br from-white/20 to-financial-gold/30 rounded mb-2"></div>
                    <div className="h-2 bg-white/40 rounded w-2/3"></div>
                  </div>
                </div>
                
                {/* Mock download button */}
                <Button className="w-full bg-financial-gold hover:bg-financial-gold-light text-financial-navy font-semibold">
                  <Download className="w-4 h-4 mr-2" />
                  Download Presentation
                </Button>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-financial-gold/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>;
}