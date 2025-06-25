
import React, { memo } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ProcessingStepIconProps {
  status: 'pending' | 'processing' | 'completed' | 'error';
}

const ProcessingStepIcon = memo(({ status }: ProcessingStepIconProps) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    case 'processing':
      return (
        <div 
          className="w-4 h-4 border-2 border-financial-gold border-t-transparent rounded-full animate-spin"
          aria-label="Processing"
          role="status"
        />
      );
    case 'error':
      return <XCircle className="w-4 h-4 text-red-600" />;
    default:
      return <div className="w-4 h-4 border-2 border-slate-300 rounded-full" />;
  }
});

ProcessingStepIcon.displayName = 'ProcessingStepIcon';

export default ProcessingStepIcon;
