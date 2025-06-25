
import { 
  FileSpreadsheet, 
  Upload, 
  Cpu, 
  Download, 
  Shield, 
  TrendingUp,
  BarChart3,
  Lock,
  Zap,
  Clock,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  FileSpreadsheet,
  Upload,
  Cpu,
  Download,
  Shield,
  TrendingUp,
  BarChart3,
  Lock,
  Zap,
  Clock,
};

export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || FileSpreadsheet;
};
