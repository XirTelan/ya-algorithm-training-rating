import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { ThemeProvider } from "@repo/ui";
import Toaster from "@repo/ui/sonner";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <main className="flex flex-1 flex-col  gap-4 container mx-auto p-2">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
      <TanStackRouterDevtools />
    </ThemeProvider>
  );
}
