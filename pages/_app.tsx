import "@/styles/globals.css";
import "@/styles/splash.css";
import "@/styles/book-cover.css";
import "@/styles/embla.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { store } from "../store";
import { Provider } from "react-redux";
import { VisitTrackerProvider } from "@/lib/contexts/VisitTrackerProvider";
import { TimeTrackingProvider } from "@/lib/contexts/TimeTrackingProvider";
import GlobalCommand from "@/components/Misc/QuickCommand";
import { useReportWebVitals } from "next/web-vitals";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TagManager, { TagManagerArgs } from "react-gtm-module";
import * as ga from "@/lib/ga";
import InitSurvey from "@/components/survey/init";

export default function App({ Component, pageProps }: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric);
    const fullUrl = new URL(window.location.href);
    metric.url = fullUrl;
    const body = JSON.stringify(metric);
    const url =
      process.env.NEXT_PUBLIC_STATISTICS_API_URL + "/api/v1/web-vital/save";

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      try {
        fetch(url, { body, method: "POST", keepalive: true });
      } catch (error) {
        console.error("Error sending web vital data:", error);
      }
    }
  });

  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  const GtmId = "GTM-PQMD87C8";

  const tagManagerArgs: TagManagerArgs = {
    gtmId: GtmId,
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <SessionProvider>
        <Provider store={store}>
          <TimeTrackingProvider>
            <VisitTrackerProvider>
              <NextNProgress
                color="#29D"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={false}
              />
              <Component {...pageProps} />
              <Toaster />
              <InitSurvey />

              <GlobalCommand />
            </VisitTrackerProvider>
          </TimeTrackingProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
