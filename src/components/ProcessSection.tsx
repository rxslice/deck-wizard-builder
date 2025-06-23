
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Upload, Wand2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Download Template",
    description: "Get our standardized Excel template with pre-configured named ranges for DCF, Comps, and Charts data."
  },
  {
    number: "02", 
    icon: Upload,
    title: "Upload Your Model",
    description: "Fill the template with your financial data and upload it. Our system automatically identifies key metrics."
  },
  {
    number: "03",
    icon: Wand2,
    title: "Generate Presentation",
    description: "In seconds, receive a professional PowerPoint with valuation summary, charts, and executive overview."
  }
];

export default function ProcessSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-financial-navy mb-4">
            Three Steps to Professional Results
          </h2>
          <p className="text-xl text-slate-600">
            From financial model to investment-ready presentation in under two minutes
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-slate-50 rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 bg-financial-gold rounded-full flex items-center justify-center text-financial-navy font-bold text-sm mr-4">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-financial-gold" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-financial-navy mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-financial-gold" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-financial-blue hover:bg-financial-blue-light text-white px-8 py-3 rounded-lg font-semibold"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
}
