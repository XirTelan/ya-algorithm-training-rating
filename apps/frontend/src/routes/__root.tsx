import Footer from "@/widgets/Footer";
import Header from "@/widgets/Header";
import { ThemeProvider } from "@repo/ui";
import Toaster from "@repo/ui/sonner";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <main className="flex flex-col gap-4 container mx-auto">
          <Outlet />
        </main>
        <Toaster />
        <TanStackRouterDevtools />
        <Footer />
      </ThemeProvider>
    </>
  ),
});
