
import Layout from "@/components/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Clear, fair terms for using ValuationDeck's financial presentation platform.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-financial-navy mb-6">Terms of Service</h2>
            
            <div className="bg-blue-50 border-l-4 border-financial-blue p-6 mb-8">
              <p className="text-financial-navy font-semibold mb-2">Effective Date: December 2024</p>
              <p className="text-slate-700">
                Welcome to ValuationDeck. These terms govern your use of our financial presentation platform.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">1. Acceptance of Terms</h3>
            <p className="text-slate-600 mb-6">
              By accessing or using ValuationDeck, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
            </p>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">2. Description of Service</h3>
            <p className="text-slate-600 mb-4">
              ValuationDeck is a browser-based platform that converts Excel financial models into professional PowerPoint presentations. The service operates entirely within your browser with no server-side data processing.
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li>Client-side processing only</li>
              <li>No data storage or transmission</li>
              <li>Immediate file generation and download</li>
              <li>Free to use with optional premium features</li>
            </ul>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">3. User Responsibilities</h3>
            <h4 className="text-lg font-semibold text-financial-navy mb-3">Acceptable Use</h4>
            <p className="text-slate-600 mb-4">You agree to use ValuationDeck only for lawful purposes and in accordance with these terms. You must not:</p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-1">
              <li>Upload malicious files or attempt to compromise the service</li>
              <li>Use the service for illegal financial activities</li>
              <li>Attempt to reverse engineer or copy the platform</li>
              <li>Share access credentials if using premium features</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <h4 className="text-lg font-semibold text-financial-navy mb-3">Data Accuracy</h4>
            <p className="text-slate-600 mb-6">
              You are solely responsible for the accuracy and validity of financial data in your Excel models. ValuationDeck processes your data as-is and does not validate financial calculations or assumptions.
            </p>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">4. Privacy and Data Handling</h3>
            <p className="text-slate-600 mb-4">
              ValuationDeck is designed with privacy at its core:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
              <li><strong>No Data Collection:</strong> We do not collect, store, or transmit your financial data</li>
              <li><strong>Client-Side Processing:</strong> All operations occur within your browser</li>
              <li><strong>Automatic Cleanup:</strong> Data is cleared from memory when you close the browser</li>
              <li><strong>No Tracking:</strong> We do not track user behavior or usage patterns</li>
            </ul>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">5. Intellectual Property</h3>
            <h4 className="text-lg font-semibold text-financial-navy mb-3">Our Content</h4>
            <p className="text-slate-600 mb-4">
              ValuationDeck's software, templates, designs, and documentation are protected by intellectual property laws. You may not copy, modify, or distribute our proprietary content without permission.
            </p>

            <h4 className="text-lg font-semibold text-financial-navy mb-3">Your Content</h4>
            <p className="text-slate-600 mb-6">
              You retain all rights to your financial models and generated presentations. We claim no ownership over your data or outputs.
            </p>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">6. Service Availability</h3>
            <p className="text-slate-600 mb-6">
              While we strive for high availability, we cannot guarantee uninterrupted service. We may temporarily suspend the service for maintenance, updates, or technical issues. We are not liable for any damages resulting from service interruptions.
            </p>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">7. Disclaimers and Limitations</h3>
            <h4 className="text-lg font-semibold text-financial-navy mb-3">Financial Advice Disclaimer</h4>
            <p className="text-slate-600 mb-4">
              ValuationDeck is a formatting and presentation tool only. We do not provide financial advice, investment recommendations, or validate financial calculations. Always consult qualified financial professionals for investment decisions.
            </p>

            <h4 className="text-lg font-semibold text-financial-navy mb-3">Limitation of Liability</h4>
            <p className="text-slate-600 mb-6">
              To the maximum extent permitted by law, ValuationDeck and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the service.
            </p>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">8. Premium Features</h3>
            <p className="text-slate-600 mb-4">
              Some advanced features may require payment. Premium feature terms include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-1">
              <li>Monthly or annual subscription billing</li>
              <li>Cancellation allowed at any time</li>
              <li>No refunds for partial subscription periods</li>
              <li>Features may change with reasonable notice</li>
            </ul>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">9. Termination</h3>
            <p className="text-slate-600 mb-6">
              You may stop using ValuationDeck at any time. We may terminate or suspend access to users who violate these terms. Upon termination, your right to use the service ceases immediately.
            </p>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">10. Changes to Terms</h3>
            <p className="text-slate-600 mb-6">
              We may update these terms periodically. Significant changes will be communicated through our website. Continued use of the service after changes constitutes acceptance of new terms.
            </p>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">11. Governing Law</h3>
            <p className="text-slate-600 mb-6">
              These terms are governed by the laws of the jurisdiction where ValuationDeck operates. Any disputes will be resolved through binding arbitration or in the appropriate courts of that jurisdiction.
            </p>

            <h3 className="text-2xl font-semibold text-financial-navy mb-4">12. Contact Information</h3>
            <p className="text-slate-600 mb-4">
              For questions about these terms or our service:
            </p>
            <div className="bg-slate-50 rounded-lg p-6">
              <p className="text-slate-600">
                <strong>Email:</strong> <a href="mailto:success@aiwinlab.com" className="text-financial-blue hover:underline">success@aiwinlab.com</a><br />
                <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/william-wheeler-aiwinlab/" className="text-financial-blue hover:underline" target="_blank" rel="noopener noreferrer">William Wheeler</a>
              </p>
            </div>

            <div className="mt-12 text-sm text-slate-500">
              <p>Last updated: December 2024</p>
              <p>These terms are effective immediately upon publication.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
