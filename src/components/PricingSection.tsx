
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-financial-navy mb-4">
            Professional-Grade Pricing
          </h2>
          <p className="text-xl text-slate-600">
            Choose the plan that fits your valuation workflow
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-slate-200 hover:border-financial-gold/50 transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-financial-navy">Starter</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-financial-navy">$0</span>
                <span className="text-slate-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>1 presentation per month</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Watermarked outputs</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Standard template</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Basic support</span>
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">
                Get Started Free
              </Button>
            </CardContent>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-2 border-financial-gold shadow-xl relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-financial-gold text-financial-navy px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-financial-navy">Professional</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-financial-navy">$97</span>
                <span className="text-slate-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Unlimited presentations</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>No watermarks</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Custom branding</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Premium templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-financial-gold hover:bg-financial-gold-light text-financial-navy font-semibold">
                Start Pro Trial
              </Button>
            </CardContent>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-2 border-slate-200 hover:border-financial-blue/50 transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-financial-navy">Enterprise</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-financial-navy">$297</span>
                <span className="text-slate-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Custom templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>White-label options</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-financial-success mr-3" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-financial-blue hover:bg-financial-blue-light text-white">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
