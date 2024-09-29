import Honeybadger from "@honeybadger-io/js";
import { HoneybadgerErrorBoundary as ErrorBoundary } from "@honeybadger-io/react";
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import Quotes from "./components/Quotes/Quotes";

import("./styles/custom.scss");

Honeybadger.configure({
  apiKey: "hbp_ENX1M79SimYcIlUO4QtdeuxTx3xSIm4xeeVI",
  environment: "production",
});

const gameRootContainer = document.getElementById("root") as HTMLDivElement;
const gameRoot = createRoot(gameRootContainer);
gameRoot.render(
  <ErrorBoundary honeybadger={Honeybadger}>
    <App />
  </ErrorBoundary>,
);

const quotesRootContainer = document.getElementById("quotes") as HTMLDivElement;
const quotesRoot = createRoot(quotesRootContainer);
quotesRoot.render(<Quotes />);
