import { ThemeProvider } from "./components/themeProvider";
import ModeToggle from "./components/themeToggle";
import ActiveContests from "./components/ActiveContests";
import SessionBlock from "./components/SessionBlock";
import Logger from "./components/Logger";
import { Toaster } from "@repo/ui/sonner";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="flex flex-col gap-4">
          <ModeToggle />
          <SessionBlock />
          <ActiveContests />
          <Logger />

          <Toaster />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
