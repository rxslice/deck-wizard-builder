
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, MessageCircle, Clock, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Have questions about ValuationDeck? Need enterprise solutions? 
            We're here to help financial professionals succeed.
          </p>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="text-xl font-semibold text-financial-navy mb-4">
                  Email Support
                </h3>
                <p className="text-slate-600 mb-6">
                  Get expert help with your financial modeling and presentation needs.
                </p>
                <Button 
                  className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy"
                  onClick={() => window.open('mailto:success@aiwinlab.com', '_blank')}
                >
                  success@aiwinlab.com
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Linkedin className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="text-xl font-semibold text-financial-navy mb-4">
                  LinkedIn Connect
                </h3>
                <p className="text-slate-600 mb-6">
                  Connect directly with our founder for strategic discussions and partnerships.
                </p>
                <Button 
                  variant="outline"
                  className="border-financial-blue text-financial-blue hover:bg-financial-blue hover:text-white"
                  onClick={() => window.open('https://www.linkedin.com/in/william-wheeler-aiwinlab/', '_blank')}
                >
                  Connect on LinkedIn
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-6 h-6 text-financial-gold" />
                </div>
                <h3 className="text-xl font-semibold text-financial-navy mb-4">
                  Live Chat
                </h3>
                <p className="text-slate-600 mb-6">
                  Real-time support during business hours for urgent questions.
                </p>
                <Button 
                  variant="outline"
                  className="border-financial-blue text-financial-blue hover:bg-financial-blue hover:text-white"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8">Why Contact Us?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-financial-gold rounded-full flex items-center justify-center">
                    <span className="text-financial-navy font-bold text-sm">?</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Technical Support</h4>
                    <p className="text-slate-600">Get help with file formats, template customization, or troubleshooting generation issues.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-financial-gold rounded-full flex items-center justify-center">
                    <span className="text-financial-navy font-bold text-sm">$</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Enterprise Solutions</h4>
                    <p className="text-slate-600">Discuss custom implementations, API access, or white-label solutions for your organization.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-financial-gold rounded-full flex items-center justify-center">
                    <span className="text-financial-navy font-bold text-sm">+</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Feature Requests</h4>
                    <p className="text-slate-600">Share ideas for new features, integrations, or improvements to better serve your workflow.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-financial-gold rounded-full flex items-center justify-center">
                    <span className="text-financial-navy font-bold text-sm">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-financial-navy mb-2">Partnership Opportunities</h4>
                    <p className="text-slate-600">Explore integration partnerships, reseller programs, or strategic collaborations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-financial-navy mb-8">Contact Information</h2>
              
              <div className="bg-slate-50 rounded-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-5 h-5 text-financial-blue" />
                    <div>
                      <p className="font-semibold text-financial-navy">Email</p>
                      <a href="mailto:success@aiwinlab.com" className="text-financial-blue hover:underline">
                        success@aiwinlab.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Linkedin className="w-5 h-5 text-financial-blue" />
                    <div>
                      <p className="font-semibold text-financial-navy">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/william-wheeler-aiwinlab/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-financial-blue hover:underline"
                      >
                        William Wheeler - AI Win Lab
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5 text-financial-blue" />
                    <div>
                      <p className="font-semibold text-financial-navy">Response Time</p>
                      <p className="text-slate-600">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <MapPin className="w-5 h-5 text-financial-blue" />
                    <div>
                      <p className="font-semibold text-financial-navy">Time Zone</p>
                      <p className="text-slate-600">UTC-5 (EST/EDT)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-financial-navy mb-3">Preferred Contact Methods</h4>
                  <div className="text-sm text-slate-600 space-y-2">
                    <p><strong>General Inquiries:</strong> Email preferred</p>
                    <p><strong>Technical Support:</strong> Email with screenshots</p>
                    <p><strong>Business Development:</strong> LinkedIn message</p>
                    <p><strong>Urgent Issues:</strong> Email with "URGENT" in subject</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-financial-navy mb-8">
            Ready to Transform Your Financial Models?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Don't wait - start creating professional presentations from your Excel models today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-financial-blue hover:bg-financial-blue-light text-white px-8 py-3 rounded-lg font-semibold"
              onClick={() => window.location.href = '/'}
            >
              Try ValuationDeck Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-financial-gold text-financial-navy hover:bg-financial-gold hover:text-financial-navy px-8 py-3 rounded-lg font-semibold"
              onClick={() => window.open('mailto:success@aiwinlab.com', '_blank')}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
