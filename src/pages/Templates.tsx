
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, BarChart3, PieChart, TrendingUp } from "lucide-react";

const templates = [
  {
    icon: FileSpreadsheet,
    title: "Standard DCF Model",
    description: "Complete discounted cash flow template with all essential components for company valuation.",
    features: ["5-year projections", "Terminal value calculation", "WACC analysis", "Sensitivity tables"],
    popular: true
  },
  {
    icon: BarChart3,
    title: "Comparable Company Analysis",
    description: "Trading and transaction multiples template for relative valuation analysis.",
    features: ["Trading multiples", "Transaction multiples", "Premium/discount analysis", "Peer benchmarking"]
  },
  {
    icon: PieChart,
    title: "LBO Model",
    description: "Leveraged buyout model template with debt structuring and returns analysis.",
    features: ["Debt schedule", "Equity returns", "Cash flow analysis", "Exit scenarios"]
  },
  {
    icon: TrendingUp,
    title: "M&A Analysis",
    description: "Merger model template with accretion/dilution and synergies analysis.",
    features: ["Pro forma modeling", "Synergies tracking", "EPS impact", "Value creation"]
  }
];

export default function Templates() {
  return (
    <Layout>
      <div className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Professional Excel Templates
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Download industry-standard templates optimized for ValuationDeck's 
            presentation generation engine.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {templates.map((template, index) => (
              <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${template.popular ? 'ring-2 ring-financial-gold' : ''}`}>
                <CardContent className="p-8">
                  {template.popular && (
                    <div className="bg-financial-gold text-financial-navy px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mr-4">
                      <template.icon className="w-6 h-6 text-financial-gold" />
                    </div>
                    <h3 className="text-xl font-semibold text-financial-navy">
                      {template.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {template.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-financial-navy mb-3">Includes:</h4>
                    <ul className="space-y-1">
                      {template.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-financial-gold rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-financial-gold hover:bg-financial-gold-light text-financial-navy font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-slate-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-financial-navy mb-6 text-center">
              Template Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileSpreadsheet className="w-6 h-6 text-financial-gold" />
                </div>
                <h4 className="font-semibold text-financial-navy mb-2">Named Ranges</h4>
                <p className="text-sm text-slate-600">Pre-configured for automatic data extraction</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-financial-gold" />
                </div>
                <h4 className="font-semibold text-financial-navy mb-2">Chart Data</h4>
                <p className="text-sm text-slate-600">Structured for automatic chart generation</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-financial-gold" />
                </div>
                <h4 className="font-semibold text-financial-navy mb-2">Validation</h4>
                <p className="text-sm text-slate-600">Built-in error checking and formulas</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-financial-navy mb-6">
              Need a Custom Template?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              We can create custom templates tailored to your specific industry, 
              transaction type, or organizational requirements.
            </p>
            <Button 
              size="lg"
              variant="outline"
              className="border-financial-blue text-financial-blue hover:bg-financial-blue hover:text-white px-8 py-3 rounded-lg font-semibold"
              onClick={() => window.open('mailto:success@aiwinlab.com?subject=Custom Template Request', '_blank')}
            >
              Request Custom Template
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
