import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// The page is pre-rendered at build time, so React takes over the existing
// markup instead of redrawing it. The 404 page and the dev server ship an empty
// root and render from scratch.
const container = document.getElementById("root")!;
if (container.hasChildNodes()) hydrateRoot(container, <App />);
else createRoot(container).render(<App />);
