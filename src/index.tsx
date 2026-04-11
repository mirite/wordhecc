import { createRoot } from "react-dom/client";

import App from "./components/App.js";
import Quotes from "./components/Quotes/Quotes.js";

import("./styles/custom.scss");

const gameRootContainer = document.getElementById("root") as HTMLDivElement;
const gameRoot = createRoot(gameRootContainer);
gameRoot.render(<App />);

const quotesRootContainer = document.getElementById("quotes") as HTMLDivElement;
const quotesRoot = createRoot(quotesRootContainer);
quotesRoot.render(<Quotes />);
