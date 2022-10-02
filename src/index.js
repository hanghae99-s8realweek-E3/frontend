import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const container = document.getElementById("root");
const root = createRoot(container);

Sentry.init({
  dsn:
    process.env.NODE_ENV === "production"
      ? "https://bfb7da0326cf412894ef9fe6353d7d0a@o4503914056646656.ingest.sentry.io/4503914057760768"
      : false,
  integrations: [new BrowserTracing()],
  release: "1.1.0",
  environment: process.env.NODE_ENV,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

root.render(
  <Provider store={store}>
    <Sentry.ErrorBoundary
      fallback={
        <p>현재 통신 상에 문제가 발생했습니다. 잠시 후, 다시 시도해주세요.</p>
      }>
      <App />
    </Sentry.ErrorBoundary>
  </Provider>
);
