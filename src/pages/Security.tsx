
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Server, FileCheck, Zap, Award } from "lucide-react";

export default function Security() {
  return (
    <Layout>
      <div className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Bank-Grade Security
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Your financial data deserves the highest level of protection. 
            Learn how we secure your sensitive information.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="font-semibold text-financial-navy mb-2">Zero Upload</h3>
                <p className="text-sm text-slate-600">Files never leave your device</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="font-semibold text-financial-navy mb-2">Client-Side Only</h3>
                <p className="text-sm text-slate-600">All processing in your browser</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="font-semibold text-financial-navy mb-2">No Tracking</h3>
                <p className="text-sm text-slate-600">Zero behavioral monitoring</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="font-semibold text-financial-navy mb-2">No Storage</h3>
                <p className="text-sm text-slate-600">Automatic memory cleanup</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8">Security Architecture</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">File Sanitization</h4>
                    <p className="text-slate-600">Automatic macro stripping and content validation ensure clean, safe file processing.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Server className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Browser Isolation</h4>
                    <p className="text-slate-600">Processing occurs in isolated browser memory with automatic cleanup after use.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Instant Processing</h4>
                    <p className="text-slate-600">Fast local processing eliminates the need for data transmission or server storage.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Compliance Ready</h4>
                    <p className="text-slate-600">Architecture meets GDPR, SOX, and financial services security requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8">Data Protection</h2>
              
              <div className="bg-slate-50 rounded-lg p-8">
                <h4 className="font-semibold text-financial-navy mb-4">What We Protect</h4>
                <ul className="space-y-2 text-slate-600 mb-6">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-financial-gold rounded-full mr-3"></div>
                    Financial models and projections
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-financial-gold rounded-full mr-3"></div>
                    Company valuations and metrics
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-financial-gold rounded-full mr-3"></div>
                    Confidential business data
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-financial-gold rounded-full mr-3"></div>
                    Investment assumptions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-financial-gold rounded-full mr-3"></div>
                    Generated presentations
                  </li>
                </ul>

                <h4 className="font-semibold text-financial-navy mb-4">How We Protect It</h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Data Transmission</span>
                    <span className="font-semibold text-green-600">Zero</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Server Storage</span>
                    <span className="font-semibold text-green-600">None</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Logging</span>
                    <span className="font-semibold text-green-600">Disabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Memory Cleanup</span>
                    <span className="font-semibold text-green-600">Automatic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-financial-blue rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Built for Financial Professionals</h3>
            <p className="text-slate-200 max-w-2xl mx-auto">
              Our security model is designed specifically for the stringent requirements of 
              investment banking, private equity, and corporate finance teams who handle 
              highly sensitive financial information daily.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
