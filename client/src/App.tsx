import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileAppBar from "@/components/layout/MobileAppBar";
import Home from "@/pages/Home";
import PropertyDetails from "@/pages/PropertyDetails";
import PropertySearch from "@/pages/PropertySearch";
import HousingPrograms from "@/pages/HousingPrograms";
import SavedProperties from "@/pages/SavedProperties";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties/:id" component={PropertyDetails} />
      <Route path="/search" component={PropertySearch} />
      <Route path="/housing-programs" component={HousingPrograms} />
      <Route path="/saved" component={SavedProperties} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen bg-light text-dark">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <MobileAppBar />
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
