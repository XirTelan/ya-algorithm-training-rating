import Nav from "./Nav";
import { ModeToggle } from "@repo/ui";

export function Header() {
  return (
    <header className="backdrop-blur-sm sticky border border-b-neutral-800 w-full top-0  z-10 ">
      <div className="flex container mx-auto justify-between">
        <Nav />
        <ModeToggle />
      </div>
    </header>
  );
}
