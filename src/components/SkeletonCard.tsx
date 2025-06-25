
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const StatCardSkeleton = () => (
  <Card className="hover:shadow-lg transition-shadow" role="presentation">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div 
            className="h-4 bg-slate-200 rounded w-24 animate-pulse" 
            aria-label="Loading statistic label"
          />
          <div 
            className="h-8 bg-slate-200 rounded w-16 animate-pulse" 
            aria-label="Loading statistic value"
          />
          <div 
            className="h-3 bg-slate-200 rounded w-20 animate-pulse" 
            aria-label="Loading statistic change"
          />
        </div>
        <div 
          className="w-12 h-12 bg-slate-200 rounded-lg animate-pulse" 
          aria-label="Loading statistic icon"
        />
      </div>
    </CardContent>
  </Card>
);

export const ModelCardSkeleton = () => (
  <div className="flex items-center space-x-3 p-3 rounded-lg" role="presentation">
    <div 
      className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" 
      aria-label="Loading model icon"
    />
    <div className="flex-1 space-y-2">
      <div 
        className="h-4 bg-slate-200 rounded w-32 animate-pulse" 
        aria-label="Loading model name"
      />
      <div 
        className="h-3 bg-slate-200 rounded w-24 animate-pulse" 
        aria-label="Loading model date"
      />
      <div 
        className="h-3 bg-slate-200 rounded w-16 animate-pulse" 
        aria-label="Loading model status"
      />
    </div>
    <div 
      className="w-16 h-6 bg-slate-200 rounded animate-pulse" 
      aria-label="Loading model action"
    />
  </div>
);

const SkeletonCard = () => (
  <Card className="border-0 shadow-lg" role="presentation">
    <CardContent className="p-8">
      <div className="w-12 h-12 bg-slate-200 rounded-lg animate-pulse mb-6" />
      <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse mb-4" />
      <div className="h-4 bg-slate-200 rounded w-full animate-pulse mb-2" />
      <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse mb-4" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 rounded w-4/5 animate-pulse" />
        <div className="h-3 bg-slate-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
      </div>
    </CardContent>
  </Card>
);

export { SkeletonCard };
