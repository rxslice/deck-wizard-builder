
import React, { Suspense, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, Settings, Download, Plus, TrendingUp, Clock, Users, BarChart3, Zap } from "lucide-react";
import { useDashboardData, useRecentModels } from "@/hooks/useDashboardData";
import { StatCardSkeleton, ModelCardSkeleton } from "@/components/SkeletonCard";
import ModelsPagination from "@/components/ModelsPagination";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const FileUpload = React.lazy(() => import("./FileUpload"));

const FileUploadSkeleton = () => (
  <div className="space-y-6">
    <div className="h-64 bg-slate-200 rounded-lg animate-pulse"></div>
    <div className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>
  </div>
);

const iconMap = {
  FileSpreadsheet,
  Clock,
  BarChart3,
  Zap
};

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 5;

  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useDashboardData();
  const { models, totalCount, isLoading: isModelsLoading } = useRecentModels(currentPage, pageSize, searchTerm);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (dashboardError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="border-red-200 bg-red-50 max-w-md">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 mb-2">Unable to Load Dashboard</h3>
            <p className="text-sm text-red-700 mb-4">
              There was an error loading your dashboard data. Please try refreshing the page.
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="text-red-700 border-red-300 hover:bg-red-100"
            >
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          {isDashboardLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <StatCardSkeleton key={index} />
            ))
          ) : (
            dashboardData?.quickStats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-financial-navy">{stat.value}</p>
                        <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                      </div>
                      <div className="w-12 h-12 bg-financial-blue/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-financial-blue" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
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
              <ErrorBoundary>
                <Suspense fallback={<FileUploadSkeleton />}>
                  <FileUpload />
                </Suspense>
              </ErrorBoundary>
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
                  <Button variant="ghost" size="sm" aria-label="Create new model">
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <ModelsPagination
                    currentPage={currentPage}
                    totalItems={totalCount}
                    itemsPerPage={pageSize}
                    searchTerm={searchTerm}
                    onPageChange={handlePageChange}
                    onSearchChange={handleSearchChange}
                  />
                  
                  <div className="space-y-2">
                    {isModelsLoading ? (
                      Array.from({ length: 3 }).map((_, index) => (
                        <ModelCardSkeleton key={index} />
                      ))
                    ) : (
                      models.map((model, index) => (
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
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Download ${model.name} presentation`}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Models
                </Button>
              </CardContent>
            </Card>

            {/* Tips & Resources - Lazy loaded */}
            <Suspense fallback={<div className="h-48 bg-slate-200 rounded-lg animate-pulse"></div>}>
              <Card className="bg-financial-blue text-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-6 h-6 text-financial-gold mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Pro Tips</h4>
                      <div className="text-sm text-slate-200 space-y-2">
                        <p>• Use named ranges for 100% accurate data extraction</p>
                        <p>• Include peer company data for stronger comps analysis</p>
                        <p>• Add executive summary text to 'exec_summary' named range</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 text-financial-navy bg-white hover:bg-slate-100">
                        Template Guide
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Suspense>

            {/* Quick Actions - Lazy loaded */}
            <Suspense fallback={<div className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>}>
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
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
