import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Content is only hidden for the scroll reveal once this class is set, and it is
// set here, before React's first paint, so nothing flashes visible and then
// hides. If the page never starts the reveal system (a script error), the
// failsafe removes the class so the content is shown rather than stuck hidden.
const root = document.documentElement;
root.classList.add("reveal-ready");
window.setTimeout(() => {
  if (!root.hasAttribute("data-reveal-live")) root.classList.remove("reveal-ready");
}, 3000);

createRoot(document.getElementById("root")!).render(<App />);
