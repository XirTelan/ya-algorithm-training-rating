import React from "react";
import Nav from "../shared/components/Nav";

export default function Header() {
  return (
    <header className="backdrop-blur-sm sticky border border-b-neutral-800 w-full top-0  z-10 ">
      <div className=" container mx-auto">
        <Nav />
      </div>
    </header>
  );
}
