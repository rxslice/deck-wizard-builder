
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, Settings, Download, Plus, TrendingUp, Clock, Users, BarChart3, Zap } from "lucide-react";
import FileUpload from "./FileUpload";

export default function Dashboard() {
  const recentModels = [
    { 
      name: "TechCorp Valuation", 
      date: "2024-01-15", 
      status: "Completed",
      type: "DCF",
      valuation: "$125M",
      slides: 8
    },
    { 
      name: "RetailCo Analysis", 
      date: "2024-01-12", 
      status: "Completed",
      type: "Comps",
      valuation: "$89M",
      slides: 6
    },
    { 
      name: "StartupXYZ Model", 
      date: "2024-01-08", 
      status: "Draft",
      type: "DCF + Comps",
      valuation: "In Progress",
      slides: 0
    },
  ];

  const quickStats = [
    { label: "Total Presentations", value: "24", icon: FileSpreadsheet, change: "+3 this month" },
    { label: "Avg. Generation Time", value: "73s", icon: Clock, change: "15% faster" },
    { label: "Models Processed", value: "156", icon: BarChart3, change: "+12 this week" },
    { label: "Time Saved", value: "48hrs", icon: Zap, change: "vs manual creation" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-financial-navy">Dashboard</h1>
              <p className="text-slate-600 mt-1">Transform your financial models into professional presentations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-financial-blue text-financial-blue">
                <Settings className="w-4 h-4 mr-2" />
                Templates
              </Button>
              <Button className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-financial-navy">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-financial-blue/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-financial-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-financial-navy">
                  Create New Presentation
                </h2>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  ✓ Client-Side Processing
                </Badge>
              </div>
              <FileUpload />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-financial-navy flex items-center justify-between">
                  Your Plan
                  <Badge className="bg-financial-gold text-financial-navy">PRO</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Presentations This Month</span>
                  <span className="text-2xl font-bold text-financial-navy">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Remaining</span>
                  <span className="text-lg font-semibold text-financial-gold">Unlimited</span>
                </div>
                <div className="pt-2 border-t">
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Models */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-financial-navy flex items-center justify-between">
                  Recent Models
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentModels.map((model, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer group">
                      <div className="w-8 h-8 bg-financial-blue/10 rounded-lg flex items-center justify-center">
                        <FileSpreadsheet className="w-4 h-4 text-financial-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-financial-navy truncate">
                          {model.name}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <span>{model.date}</span>
                          <span>•</span>
                          <span>{model.type}</span>
                          {model.slides > 0 && (
                            <>
                              <span>•</span>
                              <span>{model.slides} slides</span>
                            </>
                          )}
                        </div>
                        {model.valuation !== "In Progress" && (
                          <p className="text-xs font-medium text-financial-gold">
                            {model.valuation}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge 
                          variant={model.status === 'Completed' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            model.status === 'Completed' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                          }`}
                        >
                          {model.status}
                        </Badge>
                        {model.status === 'Completed' && (
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Models
                </Button>
              </CardContent>
            </Card>

            {/* Tips & Resources */}
            <Card className="bg-financial-blue text-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-financial-gold mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Pro Tips</h4>
                    <div className="text-sm text-slate-200 space-y-2">
                      <p>• Use named ranges for 100% accurate data extraction</p>
                      <p>• Include peer company data for stronger comps analysis</p>
                      <p>• Add executive summary text to named range "exec_summary"</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 text-financial-navy bg-white hover:bg-slate-100">
                      Template Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-financial-navy">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel Template
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Template Library
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Brand Customization
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
