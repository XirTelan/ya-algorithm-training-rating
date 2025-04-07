import SessionBlock from "./components/SessionBlock";
import Logger from "./components/Logger";
import Toaster from "@repo/ui/sonner";
import { ThemeProvider, ModeToggle } from "@repo/ui";
import ActiveContests from "./containers/ActiveContests";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@repo/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@repo/ui/skeleton";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div>
                  There was an error!
                  <Button onClick={() => resetErrorBoundary()}>
                    Try again
                  </Button>
                </div>
              )}
            >
              <main className="flex flex-col gap-4 container mx-auto">
                <ModeToggle />
                <Suspense
                  fallback={<Skeleton className="w-full h-18 rounded-xl" />}
                >
                  <SessionBlock />
                </Suspense>
                <Suspense
                  fallback={<Skeleton className="w-full h-72 rounded-xl" />}
                >
                  <ActiveContests />
                </Suspense>
                <Suspense
                  fallback={<Skeleton className="w-full h-80 rounded-xl" />}
                >
                  <Logger />
                </Suspense>

                <Toaster />
              </main>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </ThemeProvider>
    </>
  );
}

export default App;
