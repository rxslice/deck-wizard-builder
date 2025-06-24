
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, BarChart3, PieChart, Table } from "lucide-react";
import { PresentationSlide } from "@/utils/powerpointGenerator";

interface SlidePreviewProps {
  slides: PresentationSlide[];
  onSlideClick?: (slide: PresentationSlide) => void;
}

const getSlideIcon = (type: string) => {
  switch (type) {
    case 'title':
      return <FileText className="w-6 h-6 text-financial-gold" />;
    case 'chart':
    case 'combo':
      return <BarChart3 className="w-6 h-6 text-financial-blue" />;
    case 'pie':
      return <PieChart className="w-6 h-6 text-financial-navy" />;
    case 'table':
      return <Table className="w-6 h-6 text-slate-600" />;
    default:
      return <FileText className="w-6 h-6 text-slate-500" />;
  }
};

const getSlideBackground = (type: string) => {
  switch (type) {
    case 'title':
      return 'bg-gradient-to-br from-financial-gold/20 to-financial-gold/5';
    case 'chart':
    case 'combo':
      return 'bg-gradient-to-br from-financial-blue/20 to-financial-blue/5';
    case 'pie':
      return 'bg-gradient-to-br from-financial-navy/20 to-financial-navy/5';
    case 'table':
      return 'bg-gradient-to-br from-slate-200/50 to-slate-100/20';
    default:
      return 'bg-gradient-to-br from-slate-100 to-white';
  }
};

export default function SlidePreview({ slides, onSlideClick }: SlidePreviewProps) {
  if (!slides || slides.length === 0) {
    return (
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
  }

  return (
    <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
      {slides.slice(0, 6).map((slide) => (
        <Card 
          key={slide.id} 
          className="bg-white/90 border-white/30 hover:bg-white/95 transition-all cursor-pointer group"
          onClick={() => onSlideClick?.(slide)}
        >
          <CardContent className="p-3">
            <div className={`h-16 rounded mb-2 flex items-center justify-center ${getSlideBackground(slide.type)} group-hover:scale-105 transition-transform`}>
              {getSlideIcon(slide.type)}
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-financial-navy truncate">
                {slide.title}
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  {slide.type}
                </Badge>
                <div className="text-xs text-slate-500 truncate ml-1">
                  {slide.preview}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {slides.length > 6 && (
        <Card className="bg-white/10 border-white/20 flex items-center justify-center">
          <CardContent className="p-3 text-center">
            <div className="text-xs text-slate-600 font-medium">
              +{slides.length - 6} more slides
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
