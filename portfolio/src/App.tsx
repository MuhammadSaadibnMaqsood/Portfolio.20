import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {TooltipProvider} from "@component/ui/tooltip"
import { Toaster as sonner} from "@component/ui/sonner"
import {Toaster} from "@component/ui/toaster"
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactLenis
          root
          options={{
            autoRaf: true,
            smoothWheel: true,
            duration: 1.2,
            wheelMultiplier: 0.9,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            syncTouch: true,
            syncTouchLerp: 0.15,
            touchMultiplier: 1.2,
            touchInertiaExponent: 1.55,
          }}
        >
<TooltipProvider>
  <Toaster/>
  <sonner/>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Index/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>
</TooltipProvider>

        </ReactLenis>
      </QueryClientProvider>
    </>
  );
}

export default App;
