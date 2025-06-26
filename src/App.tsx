
import { StrictMode, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/hooks/useAuth";
import { ToastProvider } from "@/hooks/use-toast";
import { analytics } from "@/utils/analytics";
import { errorTracker } from "@/utils/errorTracking";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Features from "./pages/Features";
import Documentation from "./pages/Documentation";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Security from "./pages/Security";
import Templates from "./pages/Templates";
import BestPractices from "./pages/BestPractices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Log query errors
        errorTracker.logError(error as Error);
        if (failureCount < 2) return true;
        return false;
      },
    },
    mutations: {
      retry: false,
      onError: (error) => {
        errorTracker.logError(error as Error);
      },
    },
  },
});

// Analytics wrapper component
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location.pathname]);

  return <>{children}</>;
}

const App = () => (
  <StrictMode>
    <ErrorBoundary onRetry={() => window.location.reload()}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnalyticsWrapper>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/documentation" element={<Documentation />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/best-practices" element={<BestPractices />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnalyticsWrapper>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);

export default App;
