import "@/styles/globals.css";
import "@/styles/splash.css";
import "@/styles/book-cover.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { store } from "../store";
import { Provider } from "react-redux";
import { VisitTrackerProvider } from "@/lib/contexts/VisitTrackerProvider";
import { TimeTrackingProvider } from "@/lib/contexts/TimeTrackingProvider";

export default function App({ Component, pageProps }: AppProps) {
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
              />
              <Component {...pageProps} />
              <Toaster />
            </VisitTrackerProvider>
          </TimeTrackingProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
