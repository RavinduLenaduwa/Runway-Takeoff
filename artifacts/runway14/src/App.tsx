import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WorkWithUs from "@/pages/WorkWithUs";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

function Router() {
  useScrollReveal();
  useScrollToTop();
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

// `ssrPath` is only passed by the build, which renders each page to static HTML
// without a browser address to read.
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
      <Router />
    </WouterRouter>
  );
}

export default App;
