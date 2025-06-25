
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

class Analytics {
  private isEnabled: boolean = false;

  constructor() {
    this.isEnabled = typeof window !== 'undefined' && !window.location.hostname.includes('localhost');
  }

  track(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('Analytics Event:', event);
      return;
    }

    // GTM/GA4 tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_properties: event.properties,
      });
    }

    // Custom analytics endpoint
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(event.event, event.properties);
    }
  }

  trackPageView(page: string, title?: string) {
    this.track({
      event: 'page_view',
      category: 'navigation',
      action: 'page_view',
      label: page,
      properties: {
        page_path: page,
        page_title: title || document.title,
      },
    });
  }

  trackFeatureClick(featureId: string, ctaText?: string) {
    this.track({
      event: 'feature_interaction',
      category: 'features',
      action: 'click',
      label: featureId,
      properties: {
        feature_id: featureId,
        cta_text: ctaText,
        timestamp: new Date().toISOString(),
      },
    });
  }

  trackUploadFlow(stage: 'start' | 'file_selected' | 'processing' | 'completed' | 'error', properties?: Record<string, any>) {
    this.track({
      event: 'upload_funnel',
      category: 'conversion',
      action: stage,
      properties: {
        stage,
        ...properties,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

export const analytics = new Analytics();
