
import React, { Suspense, lazy } from 'react';
import { useFeaturesData } from '@/hooks/useFeaturesData';
import { analytics } from '@/utils/analytics';
import { SkeletonCard } from './SkeletonCard';

const InteractiveFeatureCard = lazy(() => import('./InteractiveFeatureCard'));

const FeatureSectionSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 6 }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default function FeatureSection() {
  const { data: features, isLoading, error } = useFeaturesData();

  const handleFeatureClick = (featureId: string) => {
    analytics.trackFeatureClick(featureId);
    
    // Smooth scroll to relevant section
    const targetSection = document.getElementById(featureId.replace('-', ''));
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleCtaClick = (featureId: string, ctaLink?: string) => {
    analytics.trackFeatureClick(featureId, ctaLink);
    
    if (ctaLink?.startsWith('#')) {
      // Internal anchor link
      const targetId = ctaLink.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (ctaLink) {
      // External link
      window.open(ctaLink, '_blank', 'noopener,noreferrer');
    }
  };

  if (error) {
    return (
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto text-center">
          <p className="text-red-600">Failed to load features. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-20 px-4 bg-slate-50"
      role="region"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 
            id="features-heading"
            className="text-4xl font-bold text-financial-navy mb-4"
          >
            Enterprise-Grade Financial Modeling
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Built for the demanding requirements of financial professionals who need speed, 
            security, and institutional-quality output.
          </p>
        </div>
        
        {isLoading ? (
          <FeatureSectionSkeleton />
        ) : (
          <Suspense fallback={<FeatureSectionSkeleton />}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features?.sort((a, b) => a.priority - b.priority).map((feature, index) => (
                <InteractiveFeatureCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  onCardClick={handleFeatureClick}
                  onCtaClick={handleCtaClick}
                />
              ))}
            </div>
          </Suspense>
        )}
      </div>
    </section>
  );
}
