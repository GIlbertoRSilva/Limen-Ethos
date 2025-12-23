import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/context/LanguageContext";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Consent from "./pages/Consent";
import Individual from "./pages/Individual";
import Social from "./pages/Social";
import Educational from "./pages/Educational";
import Ethos from "./pages/DAO";
import About from "./pages/About";
import Reflections from "./pages/Reflections";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      {/* Landing - Initial beautiful page */}
      <Route path="/" element={<Index />} />
      
      {/* Consent - shown before accessing modules */}
      <Route path="/consent" element={<Consent />} />
      
      {/* Home Hub - after consent */}
      <Route path="/home" element={<Home />} />
      
      {/* Auth - optional for persistence */}
      <Route path="/auth" element={<Auth />} />
      
      {/* Three Pillars */}
      <Route path="/individual" element={<Individual />} />
      <Route path="/social" element={<Social />} />
      <Route path="/educational" element={<Educational />} />
      
      {/* Ethos (DAO) */}
      <Route path="/ethos" element={<Ethos />} />
      
      {/* About */}
      <Route path="/about" element={<About />} />
      
      {/* Saved Reflections for logged users */}
      <Route path="/reflections" element={<Reflections />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
