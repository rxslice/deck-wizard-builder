
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Lightbulb, Target, BookOpen, TrendingUp } from "lucide-react";

export default function BestPractices() {
  return (
    <Layout>
      <div className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Best Practices Guide
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Master financial modeling and presentation generation with proven 
            techniques from industry professionals.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-financial-navy">Do's</h3>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-financial-navy">Don'ts</h3>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-financial-navy">Tips</h3>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8 flex items-center">
                <Target className="w-8 h-8 mr-3 text-financial-gold" />
                Model Structure
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Best Practices
                  </h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      Use consistent formatting across all sheets
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      Create named ranges for key outputs
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      Separate inputs, calculations, and outputs
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      Include clear labels and units
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      Use consistent date formatting
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Avoid These Mistakes
                  </h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      Hardcoding values in formulas
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      Using merged cells extensively
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      Complex nested IF statements
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      Inconsistent decimal places
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      Missing error checking
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8 flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-financial-gold" />
                Data Quality
              </h2>
              
              <div className="bg-slate-50 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-4">Financial Projections</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Ensure P&L, Balance Sheet, and Cash Flow tie together</li>
                      <li>• Use realistic growth assumptions</li>
                      <li>• Include sensitivity analysis</li>
                      <li>• Validate key ratios and metrics</li>
                      <li>• Cross-check against industry benchmarks</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-4">Valuation Outputs</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Document all assumptions clearly</li>
                      <li>• Show multiple valuation methods</li>
                      <li>• Include trading and transaction comparables</li>
                      <li>• Perform scenario analysis</li>
                      <li>• Validate terminal value assumptions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-financial-gold" />
                Presentation Tips
              </h2>
              
              <div className="space-y-6">
                <Card className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-financial-navy mb-3 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-blue-500" />
                      Pro Tip: Executive Summary
                    </h4>
                    <p className="text-slate-600">
                      Always lead with a clear executive summary slide that highlights 
                      key valuation range, investment thesis, and critical assumptions. 
                      This gives your audience the big picture before diving into details.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-financial-navy mb-3 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-green-500" />
                      Pro Tip: Chart Selection
                    </h4>
                    <p className="text-slate-600">
                      Use waterfall charts for showing value bridges, combo charts for 
                      revenue/margin analysis, and sensitivity tables for key assumptions. 
                      Choose chart types that best tell your financial story.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-amber-500">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-financial-navy mb-3 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-amber-500" />
                      Pro Tip: Scenario Analysis
                    </h4>
                    <p className="text-slate-600">
                      Include base, upside, and downside scenarios in your presentation. 
                      This demonstrates thorough analysis and helps stakeholders understand 
                      the range of potential outcomes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
