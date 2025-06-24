
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Play, BookOpen, HelpCircle, Code } from "lucide-react";

export default function Documentation() {
  return (
    <Layout>
      <div className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Documentation & Resources
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to know to create professional presentations 
            from your financial models in minutes.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Download className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="text-xl font-semibold text-financial-navy mb-4">
                  Excel Template
                </h3>
                <p className="text-slate-600 mb-6">
                  Download our standardized template with pre-configured named ranges.
                </p>
                <Button className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy">
                  Download Template
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Play className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="text-xl font-semibold text-financial-navy mb-4">
                  Video Tutorials
                </h3>
                <p className="text-slate-600 mb-6">
                  Step-by-step video guides for creating professional presentations.
                </p>
                <Button variant="outline" className="border-financial-blue text-financial-blue">
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-6">
                  <HelpCircle className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="text-xl font-semibold text-financial-navy mb-4">
                  FAQ & Support
                </h3>
                <p className="text-slate-600 mb-6">
                  Find answers to common questions and get expert support.
                </p>
                <Button variant="outline" className="border-financial-blue text-financial-blue">
                  Get Help
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8">Quick Start Guide</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-financial-gold rounded-full flex items-center justify-center text-financial-navy font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Download Template</h4>
                    <p className="text-slate-600">Get our standardized Excel template with pre-configured sections for DCF, Comps, and presentation data.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-financial-gold rounded-full flex items-center justify-center text-financial-navy font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Build Your Model</h4>
                    <p className="text-slate-600">Fill in your financial projections, assumptions, and valuation calculations using the named ranges provided.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-financial-gold rounded-full flex items-center justify-center text-financial-navy font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Upload & Generate</h4>
                    <p className="text-slate-600">Upload your completed model and generate a professional PowerPoint presentation in under 60 seconds.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8">Template Structure</h2>
              
              <div className="bg-slate-50 rounded-lg p-6">
                <h4 className="font-semibold text-financial-navy mb-4">Required Sheets:</h4>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-financial-blue" />
                    <strong>Summary:</strong> Key metrics and valuation outputs
                  </li>
                  <li className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-financial-blue" />
                    <strong>Assumptions:</strong> Model inputs and drivers
                  </li>
                  <li className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-financial-blue" />
                    <strong>Projections:</strong> Financial forecasts (P&L, BS, CF)
                  </li>
                  <li className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-financial-blue" />
                    <strong>Valuation:</strong> DCF and comparable analysis
                  </li>
                  <li className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-financial-blue" />
                    <strong>Charts:</strong> Data for automatic chart generation
                  </li>
                </ul>

                <h4 className="font-semibold text-financial-navy mb-4 mt-6">Named Ranges:</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>• Company_Name</p>
                  <p>• Valuation_Range</p>
                  <p>• Revenue_Projections</p>
                  <p>• EBITDA_Projections</p>
                  <p>• Key_Assumptions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-financial-navy mb-12 text-center">API Reference</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Code className="w-6 h-6 text-financial-blue mr-3" />
                  <h3 className="text-xl font-semibold text-financial-navy">JavaScript SDK</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Integrate ValuationDeck into your own applications with our JavaScript SDK.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 mb-4">
                  <code className="text-green-400 text-sm">
                    npm install @valuationdeck/sdk
                  </code>
                </div>
                <Button variant="outline" className="border-financial-blue text-financial-blue">
                  View SDK Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 text-financial-blue mr-3" />
                  <h3 className="text-xl font-semibold text-financial-navy">REST API</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Server-to-server integration for enterprise applications and workflows.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 mb-4">
                  <code className="text-blue-400 text-sm">
                    POST /api/v1/generate
                  </code>
                </div>
                <Button variant="outline" className="border-financial-blue text-financial-blue">
                  API Reference
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
