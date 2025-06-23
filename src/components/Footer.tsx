
import { TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-financial-navy text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-financial-gold rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-financial-navy" />
              </div>
              <span className="text-xl font-bold">ValuationDeck</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Transform financial models into professional presentations with enterprise-grade security and speed.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-financial-gold transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-financial-gold transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Video Tutorials</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Best Practices</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-financial-gold transition-colors">About</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-financial-gold transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 ValuationDeck. All rights reserved. Built for financial professionals who demand excellence.</p>
        </div>
      </div>
    </footer>
  );
}
