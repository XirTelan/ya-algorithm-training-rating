import SessionBlock from "./components/SessionBlock";
import Logger from "./components/Logger";
import Toaster from "@repo/ui/sonner";
import { ThemeProvider, ModeToggle } from "@repo/ui";
import ActiveContests from "./containers/ActiveContests";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="flex flex-col gap-4 container mx-auto">
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
