
import React, { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PresentationSlide } from '@/utils/powerpointGenerator';

const SlidePreview = React.lazy(() => import('./SlidePreview'));

interface LazySlidePreviewProps {
  slides: PresentationSlide[];
  onSlideClick?: (slide: PresentationSlide) => void;
}

const SlidePreviewSkeleton = () => (
  <div className="grid grid-cols-2 gap-3">
    {[1, 2].map((i) => (
      <Card key={i} className="bg-white/10 border-white/20">
        <CardContent className="p-3">
          <div className="h-16 bg-gradient-to-br from-slate-200/30 to-slate-100/10 rounded mb-2 animate-pulse"></div>
          <div className="h-2 bg-white/20 rounded w-3/4 animate-pulse"></div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function LazySlidePreview({ slides, onSlideClick }: LazySlidePreviewProps) {
  return (
    <Suspense fallback={<SlidePreviewSkeleton />}>
      <SlidePreview slides={slides} onSlideClick={onSlideClick} />
    </Suspense>
  );
}
