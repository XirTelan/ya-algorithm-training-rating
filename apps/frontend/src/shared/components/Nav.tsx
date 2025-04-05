import { Link } from "@tanstack/react-router";
import React from "react";

export default function Nav() {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Рейтинг
      </Link>{" "}
      <Link to="/statistic" className="[&.active]:font-bold">
        Статистика
      </Link>
      <Link to="/status" className="[&.active]:font-bold">
        Статус
      </Link>
    </div>
  );
}
