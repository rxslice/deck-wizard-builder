
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Cpu, Download, Shield, TrendingUp, FileSpreadsheet } from "lucide-react";

const features = [
  {
    icon: FileSpreadsheet,
    title: "Standardized Excel Template",
    description: "Download our pre-structured template with named ranges for seamless data extraction and professional output."
  },
  {
    icon: Upload,
    title: "Smart File Processing",
    description: "Drag and drop your completed model. Our engine automatically identifies key metrics and valuation outputs."
  },
  {
    icon: Cpu,
    title: "Browser-Based Generation",
    description: "All processing happens locally in your browser. Your sensitive financial data never touches our servers."
  },
  {
    icon: Download,
    title: "Professional PowerPoint",
    description: "Generate fully-editable, institutional-quality presentations with charts, tables, and executive summaries."
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Zero data transmission. Your models and valuations remain completely private and secure on your device."
  },
  {
    icon: TrendingUp,
    title: "Investment-Ready Format",
    description: "Output follows industry standards used by investment banks, private equity, and corporate development teams."
  }
];

export default function FeatureSection() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-financial-navy mb-4">
            Enterprise-Grade Financial Modeling
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Built for the demanding requirements of financial professionals who need speed, 
            security, and institutional-quality output.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="text-xl font-semibold text-financial-navy mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
