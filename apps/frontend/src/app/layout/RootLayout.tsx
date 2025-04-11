import { Footer } from "@/widgets/layout";
import { Header } from "@/widgets/layout";
import { ThemeProvider } from "@repo/ui";
import { Button } from "@repo/ui/button";
import Toaster from "@repo/ui/sonner";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={errorBoundaryFallBack}>
            <Header />
            <main className="flex flex-1 flex-col  gap-4 container mx-auto p-2">
              <Outlet />
            </main>
            <Toaster />
            <Footer />
            <TanStackRouterDevtools />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </ThemeProvider>
  );
}

const errorBoundaryFallBack = ({ resetErrorBoundary }: FallbackProps) => (
  <div className="w-full h-screen  justify-center items-center flex">
    <div className="flex flex-col">
      <span>There was an error!</span>
      <Button onClick={() => resetErrorBoundary()}>Try again</Button>
    </div>
  </div>
);
