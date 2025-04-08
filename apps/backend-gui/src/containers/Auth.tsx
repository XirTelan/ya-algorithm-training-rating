import Login from "@/components/Login";
import useAuthStore from "@/store/useAuthStore";

import React from "react";

export default function Auth({ children }: { children: React.ReactNode }) {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  if (isAuthorized) return <>{children}</>;
  else return <Login />;
}
