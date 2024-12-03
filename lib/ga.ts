// log the pageview with their URL
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

// log specific events happening.
export const event = ({
  action,
  params,
  callback = () => {},
  timeout = 2000,
}: {
  action: string;
  params: Record<string, any>;
  callback?: () => void;
  timeout?: number;
}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      ...params,
      event_callback: callback,
      event_timeout: timeout,
    });
  }
};

const ga = {
  pageview,
  event,
};

export default ga;
