
import { useMemo } from 'react';
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
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      if (failureCount < 2) return true;
      return false;
    },
  });
};

export const useRecentModels = (page: number = 1, pageSize: number = 10, searchTerm: string = '') => {
  const { data, isLoading, error } = useDashboardData();
  
  // Use useMemo instead of useEffect + useState for better performance
  const { models: filteredModels, totalCount } = useMemo(() => {
    if (!data?.recentModels) {
      return { models: [], totalCount: 0 };
    }
    
    let filtered = data.recentModels;
    
    // Server-side filtering simulation - in real app, move to API
    if (searchTerm) {
      filtered = filtered.filter(model => 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedModels = filtered.slice(startIndex, endIndex);
    
    return {
      models: paginatedModels,
      totalCount: filtered.length
    };
  }, [data, page, pageSize, searchTerm]);
  
  // Enhanced error and empty state handling
  const isEmpty = !isLoading && filteredModels.length === 0;
  const hasError = !!error;
  
  return {
    models: filteredModels,
    totalCount,
    isLoading,
    error,
    isEmpty,
    hasError,
    // Helper methods for UI state
    showEmptyState: isEmpty && !searchTerm,
    showNoResults: isEmpty && !!searchTerm,
    canLoadMore: totalCount > page * pageSize
  };
};
