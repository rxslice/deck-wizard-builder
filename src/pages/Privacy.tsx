
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Database } from "lucide-react";

export default function Privacy() {
  return (
    <Layout>
      <div className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Your privacy is our absolute priority. Learn how we protect your financial data.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="font-semibold text-financial-navy">Zero Data Collection</h3>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="font-semibold text-financial-navy">Client-Side Only</h3>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="font-semibold text-financial-navy">No Tracking</h3>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="font-semibold text-financial-navy">No Storage</h3>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-financial-navy mb-6">Our Privacy Commitment</h2>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
              <p className="text-green-800 font-semibold mb-2">Complete Privacy Guarantee</p>
              <p className="text-green-700">
                ValuationDeck operates entirely within your browser. Your financial models, data, 
                and generated presentations never leave your device. We have zero access to your information.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">What We Don't Collect</h3>
            <ul className="list-disc pl-6 mb-8 text-slate-600 space-y-2">
              <li>Your Excel files or financial models</li>
              <li>Generated PowerPoint presentations</li>
              <li>Personal or company information</li>
              <li>Usage patterns or behavior data</li>
              <li>IP addresses or device information</li>
              <li>Cookies or tracking data</li>
            </ul>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">How It Works</h3>
            <div className="bg-slate-50 rounded-lg p-6 mb-8">
              <ol className="list-decimal pl-6 text-slate-600 space-y-3">
                <li><strong>Upload:</strong> Your Excel file is processed entirely in your browser's memory</li>
                <li><strong>Processing:</strong> All calculations and presentation generation happen locally</li>
                <li><strong>Download:</strong> The PowerPoint file is created and downloaded directly from your browser</li>
                <li><strong>Cleanup:</strong> All data is automatically cleared from browser memory when you close the page</li>
              </ol>
            </div>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">Technical Implementation</h3>
            <p className="text-slate-600 mb-4">
              ValuationDeck uses modern web technologies to ensure complete privacy:
            </p>
            <ul className="list-disc pl-6 mb-8 text-slate-600 space-y-2">
              <li><strong>Client-Side Processing:</strong> All file parsing and presentation generation happens in your browser</li>
              <li><strong>No Server Communication:</strong> Zero data transmission to our servers during processing</li>
              <li><strong>Memory Management:</strong> Files are processed in temporary browser memory and automatically cleared</li>
              <li><strong>Open Source Libraries:</strong> We use trusted, auditable libraries for file processing</li>
            </ul>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">Security Measures</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-financial-navy mb-3">File Security</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Automatic macro stripping</li>
                  <li>• File format validation</li>
                  <li>• Content sanitization</li>
                  <li>• Memory isolation</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-financial-navy mb-3">Data Protection</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Zero server storage</li>
                  <li>• No data logging</li>
                  <li>• Automatic cleanup</li>
                  <li>• Browser sandboxing</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">Compliance</h3>
            <p className="text-slate-600 mb-4">
              Our privacy-first approach ensures compliance with global privacy regulations:
            </p>
            <ul className="list-disc pl-6 mb-8 text-slate-600 space-y-2">
              <li><strong>GDPR:</strong> No personal data processing or storage</li>
              <li><strong>CCPA:</strong> No data collection or sale</li>
              <li><strong>SOX:</strong> Maintains data integrity and confidentiality</li>
              <li><strong>Industry Standards:</strong> Follows financial services best practices</li>
            </ul>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">Contact Information</h3>
            <p className="text-slate-600 mb-4">
              If you have any questions about our privacy practices, please contact us:
            </p>
            <div className="bg-slate-50 rounded-lg p-6">
              <p className="text-slate-600">
                <strong>Email:</strong> <a href="mailto:success@aiwinlab.com" className="text-financial-blue hover:underline">success@aiwinlab.com</a><br />
                <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/william-wheeler-aiwinlab/" className="text-financial-blue hover:underline" target="_blank" rel="noopener noreferrer">William Wheeler</a>
              </p>
            </div>

            <div className="mt-12 text-sm text-slate-500">
              <p>Last updated: December 2024</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
