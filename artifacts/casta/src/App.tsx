import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WorkWithUs from "@/pages/WorkWithUs";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import { useEffect } from "react";

// A simple theme provider to enforce dark mode, as it suits "ultra-minimalist, futuristic" vibes well,
// but we will also support system preference with a toggle if needed.
// Given the requirements "strictly black, white, and grayscale only", a dark mode default is very powerful.
function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work-with-us" component={WorkWithUs} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </ThemeProvider>
  );
}

export default App;
