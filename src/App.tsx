import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { KeepAwake } from "@capacitor-community/keep-awake";
import Home from "./pages/Home";
import Capote from "./pages/Capote";
import Truco from "./pages/Truco";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const keepScreenOn = async () => {
      try {
        await KeepAwake.keepAwake();
      } catch (error) {
        // Feature might not be supported on web/browser, safely ignore
        console.log("KeepAwake not supported or failed:", error);
      }
    };
    
    keepScreenOn();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/capote" element={<Capote />} />
            <Route path="/truco" element={<Truco />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
