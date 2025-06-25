
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface QuickStat {
  label: string;
  value: string;
  change: string;
  icon: string;
}

interface RecentModel {
  name: string;
  date: string;
  status: string;
  type: string;
  valuation: string;
  slides: number;
}

interface DashboardData {
  quickStats: QuickStat[];
  recentModels: RecentModel[];
}

// Simulated API call - replace with real API endpoint
const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    quickStats: [
      { label: "Total Presentations", value: "24", icon: "FileSpreadsheet", change: "+3 this month" },
      { label: "Avg. Generation Time", value: "73s", icon: "Clock", change: "15% faster" },
      { label: "Models Processed", value: "156", icon: "BarChart3", change: "+12 this week" },
      { label: "Time Saved", value: "48hrs", icon: "Zap", change: "vs manual creation" }
    ],
    recentModels: [
      { 
        name: "TechCorp Valuation", 
        date: "2024-01-15", 
        status: "Completed",
        type: "DCF",
        valuation: "$125M",
        slides: 8
      },
      { 
        name: "RetailCo Analysis", 
        date: "2024-01-12", 
        status: "Completed",
        type: "Comps",
        valuation: "$89M",
        slides: 6
      },
      { 
        name: "StartupXYZ Model", 
        date: "2024-01-08", 
        status: "Draft",
        type: "DCF + Comps",
        valuation: "In Progress",
        slides: 0
      },
    ]
  };
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
};

export const useRecentModels = (page: number = 1, pageSize: number = 10, searchTerm: string = '') => {
  const [filteredModels, setFilteredModels] = useState<RecentModel[]>([]);
  
  const { data, isLoading, error } = useDashboardData();
  
  useEffect(() => {
    if (data?.recentModels) {
      let filtered = data.recentModels;
      
      if (searchTerm) {
        filtered = filtered.filter(model => 
          model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          model.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setFilteredModels(filtered.slice(startIndex, endIndex));
    }
  }, [data, page, pageSize, searchTerm]);
  
  return {
    models: filteredModels,
    totalCount: data?.recentModels.length || 0,
    isLoading,
    error
  };
};
