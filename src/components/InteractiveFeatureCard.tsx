
import React, { memo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { Feature } from '@/hooks/useFeaturesData';
import { getIconComponent } from '@/utils/iconUtils';

interface InteractiveFeatureCardProps {
  feature: Feature;
  index: number;
  onCardClick: (featureId: string) => void;
  onCtaClick: (featureId: string, ctaLink?: string) => void;
}

const InteractiveFeatureCard = memo(({ 
  feature, 
  index, 
  onCardClick, 
  onCtaClick 
}: InteractiveFeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = getIconComponent(feature.icon);

  const handleCardClick = () => {
    onCardClick(feature.id);
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCtaClick(feature.id, feature.ctaLink);
  };

  return (
    <Card 
      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-labelledby={`feature-title-${feature.id}`}
      aria-describedby={`feature-description-${feature.id}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <CardContent className="p-8 relative overflow-hidden">
        {/* Background animation */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-financial-gold/5 to-financial-blue/5 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-financial-blue rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-financial-gold" />
          </div>
          
          <h3 
            id={`feature-title-${feature.id}`}
            className="text-xl font-semibold text-financial-navy mb-4"
          >
            {feature.title}
          </h3>
          
          <p 
            id={`feature-description-${feature.id}`}
            className="text-slate-600 leading-relaxed mb-6"
          >
            {feature.description}
          </p>

          {feature.details && (
            <ul className="text-sm text-slate-500 space-y-1 mb-6">
              {feature.details.map((detail, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-financial-gold rounded-full mr-2"></div>
                  {detail}
                </li>
              ))}
            </ul>
          )}

          {feature.ctaText && (
            <Button
              variant="ghost"
              size="sm"
              className="text-financial-blue hover:text-financial-blue-light hover:bg-financial-blue/10 p-0 h-auto font-medium"
              onClick={handleCtaClick}
              aria-label={`${feature.ctaText} for ${feature.title}`}
            >
              {feature.ctaText}
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          )}
        </div>

        {/* Micro-animation overlay for demo features */}
        {feature.id === 'smart-processing' && isHovered && (
          <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
            <div className="w-full h-full border-2 border-financial-gold rounded-lg animate-pulse">
              <div className="w-full h-2 bg-financial-gold mt-2 rounded animate-pulse delay-100"></div>
              <div className="w-3/4 h-2 bg-financial-gold mt-1 rounded animate-pulse delay-200"></div>
              <div className="w-1/2 h-2 bg-financial-gold mt-1 rounded animate-pulse delay-300"></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

InteractiveFeatureCard.displayName = 'InteractiveFeatureCard';

export default InteractiveFeatureCard;
