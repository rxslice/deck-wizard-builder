
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Cpu, Download, Shield, TrendingUp, FileSpreadsheet, BarChart3, Lock, Zap, Users } from "lucide-react";

const features = [
  {
    icon: FileSpreadsheet,
    title: "Standardized Excel Template",
    description: "Download our pre-structured template with named ranges for seamless data extraction and professional output.",
    details: ["Pre-configured DCF sections", "Named ranges for automatic detection", "Compatible with all Excel versions", "Built-in validation formulas"]
  },
  {
    icon: Upload,
    title: "Smart File Processing",
    description: "Drag and drop your completed model. Our engine automatically identifies key metrics and valuation outputs.",
    details: ["Automatic data recognition", "Support for complex models", "Error detection and validation", "100MB file size limit"]
  },
  {
    icon: Cpu,
    title: "Browser-Based Generation",
    description: "All processing happens locally in your browser. Your sensitive financial data never touches our servers.",
    details: ["Zero data transmission", "Client-side processing only", "Works offline", "No account required"]
  },
  {
    icon: Download,
    title: "Professional PowerPoint",
    description: "Generate fully-editable, institutional-quality presentations with charts, tables, and executive summaries.",
    details: ["Investment-grade formatting", "Customizable themes", "Editable charts and tables", "Executive summary slides"]
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Zero data transmission. Your models and valuations remain completely private and secure on your device.",
    details: ["Macro stripping", "File sanitization", "No server uploads", "GDPR compliant"]
  },
  {
    icon: TrendingUp,
    title: "Investment-Ready Format",
    description: "Output follows industry standards used by investment banks, private equity, and corporate development teams.",
    details: ["Industry-standard layouts", "Professional color schemes", "Consistent formatting", "Compliance-ready"]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Automatically generate key financial metrics, ratios, and valuation multiples from your model data.",
    details: ["DCF analysis charts", "Comparable company analysis", "Sensitivity tables", "Waterfall charts"]
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your financial models never leave your device. Complete privacy guaranteed with local processing.",
    details: ["No data collection", "No tracking", "No cookies", "Complete anonymity"]
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate professional presentations in under 60 seconds, even for complex financial models.",
    details: ["Sub-minute generation", "Optimized algorithms", "Real-time progress", "Instant download"]
  }
];

export default function Features() {
  return (
    <Layout>
      <div className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Powerful Features for Financial Professionals
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Every feature is designed with the demanding requirements of investment banking, 
            private equity, and corporate finance teams in mind.
          </p>
          <Button 
            size="lg"
            className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy px-8 py-3 rounded-lg font-semibold"
            onClick={() => window.location.href = '/'}
          >
            Try It Now
          </Button>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-financial-gold" />
                  </div>
                  <h3 className="text-xl font-sem ibold text-financial-navy mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-financial-gold rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-financial-navy mb-8">
            Ready to Transform Your Financial Models?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of financial professionals who trust ValuationDeck 
            for their most important presentations.
          </p>
          <Button 
            size="lg"
            className="bg-financial-blue hover:bg-financial-blue-light text-white px-8 py-3 rounded-lg font-semibold"
            onClick={() => window.location.href = '/'}
          >
            Get Started Free
          </Button>
        </div>
      </section>
    </Layout>
  );
}
