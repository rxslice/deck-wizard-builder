
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Settings, Download, Plus, TrendingUp } from "lucide-react";
import FileUpload from "./FileUpload";

export default function Dashboard() {
  const recentModels = [
    { name: "TechCorp Valuation", date: "2024-01-15", status: "Completed" },
    { name: "RetailCo Analysis", date: "2024-01-12", status: "Completed" },
    { name: "StartupXYZ Model", date: "2024-01-08", status: "Draft" },
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-financial-navy mb-4">
                Create New Presentation
              </h2>
              <FileUpload />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-financial-navy">
                  Your Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Presentations Created</span>
                  <span className="text-2xl font-bold text-financial-navy">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">This Month</span>
                  <span className="text-lg font-semibold text-financial-gold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Plan</span>
                  <span className="text-sm bg-financial-gold/20 text-financial-navy px-2 py-1 rounded">
                    Professional
                  </span>
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
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <div className="w-8 h-8 bg-financial-blue/10 rounded-lg flex items-center justify-center">
                        <FileSpreadsheet className="w-4 h-4 text-financial-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-financial-navy truncate">
                          {model.name}
                        </p>
                        <p className="text-xs text-slate-500">{model.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        model.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-financial-blue text-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-financial-gold mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Pro Tip</h4>
                    <p className="text-sm text-slate-200">
                      Use named ranges in your Excel model for more accurate data extraction and better formatting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
