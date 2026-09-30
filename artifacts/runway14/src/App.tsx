import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WorkWithUs from "@/pages/WorkWithUs";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function Router() {
  useScrollReveal();
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
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
