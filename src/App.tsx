import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Jornal from "./pages/Jornal";
import Reclame from "./pages/Reclame";
import Sugestoes from "./pages/Sugestoes";
import NotFound from "./pages/NotFound";
import LoginAluno from "./pages/login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/jornal" replace />} />
          <Route path="/jornal" element={<Jornal />} />
          <Route path="/reclame" element={<Reclame />} />
          <Route path="/sugestoes" element={<Sugestoes />} />
          <Route path="/login" element={<LoginAluno/>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
