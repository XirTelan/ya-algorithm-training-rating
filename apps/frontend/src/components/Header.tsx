import React from "react";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="backdrop-blur-sm sticky border border-b-neutral-800 w-full top-0  ">
      <div className=" container mx-auto">
        <Nav />
      </div>
    </header>
  );
}
