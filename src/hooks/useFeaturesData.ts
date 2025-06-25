
import { useQuery } from '@tanstack/react-query';

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  details?: string[];
  priority: number;
  ctaText?: string;
  ctaLink?: string;
}

// Simulated CMS/API call for dynamic features
const fetchFeaturesData = async (): Promise<Feature[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'excel-template',
      icon: 'FileSpreadsheet',
      title: 'Standardized Excel Template',
      description: 'Download our pre-structured template with named ranges for seamless data extraction and professional output.',
      details: ['Pre-configured DCF sections', 'Named ranges for automatic detection', 'Compatible with all Excel versions', 'Built-in validation formulas'],
      priority: 1,
      ctaText: 'Download Template',
      ctaLink: '#template'
    },
    {
      id: 'smart-processing',
      icon: 'Upload',
      title: 'Smart File Processing',
      description: 'Drag and drop your completed model. Our engine automatically identifies key metrics and valuation outputs.',
      details: ['Automatic data recognition', 'Support for complex models', 'Error detection and validation', '100MB file size limit'],
      priority: 2,
      ctaText: 'Try Demo',
      ctaLink: '#demo'
    },
    {
      id: 'browser-generation',
      icon: 'Cpu',
      title: 'Browser-Based Generation',
      description: 'All processing happens locally in your browser. Your sensitive financial data never touches our servers.',
      details: ['Zero data transmission', 'Client-side processing only', 'Works offline', 'No account required'],
      priority: 3,
      ctaText: 'Security Guide',
      ctaLink: '#security'
    },
    {
      id: 'professional-powerpoint',
      icon: 'Download',
      title: 'Professional PowerPoint',
      description: 'Generate fully-editable, institutional-quality presentations with charts, tables, and executive summaries.',
      details: ['Investment-grade formatting', 'Customizable themes', 'Editable charts and tables', 'Executive summary slides'],
      priority: 4,
      ctaText: 'View Samples',
      ctaLink: '#samples'
    },
    {
      id: 'bank-security',
      icon: 'Shield',
      title: 'Bank-Grade Security',
      description: 'Zero data transmission. Your models and valuations remain completely private and secure on your device.',
      details: ['Macro stripping', 'File sanitization', 'No server uploads', 'GDPR compliant'],
      priority: 5,
      ctaText: 'Learn More',
      ctaLink: '#privacy'
    },
    {
      id: 'investment-ready',
      icon: 'TrendingUp',
      title: 'Investment-Ready Format',
      description: 'Output follows industry standards used by investment banks, private equity, and corporate development teams.',
      details: ['Industry-standard layouts', 'Professional color schemes', 'Consistent formatting', 'Compliance-ready'],
      priority: 6,
      ctaText: 'View Examples',
      ctaLink: '#examples'
    }
  ];
};

export const useFeaturesData = () => {
  return useQuery({
    queryKey: ['featuresData'],
    queryFn: fetchFeaturesData,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};
