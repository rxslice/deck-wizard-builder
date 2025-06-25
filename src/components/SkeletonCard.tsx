
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const StatCardSkeleton = () => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
          <div className="h-8 bg-slate-200 rounded w-16 animate-pulse"></div>
          <div className="h-3 bg-slate-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="w-12 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
);

export const ModelCardSkeleton = () => (
  <div className="flex items-center space-x-3 p-3 rounded-lg">
    <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
      <div className="h-3 bg-slate-200 rounded w-24 animate-pulse"></div>
      <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
    </div>
    <div className="w-16 h-6 bg-slate-200 rounded animate-pulse"></div>
  </div>
);
