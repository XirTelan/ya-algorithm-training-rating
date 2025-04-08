import useAuthStore from "@/store/useAuthStore";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useState } from "react";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError("API key is required.");
      return;
    }
    setError("");
    login(key.trim()).then((res) => {
      if (!res) setError("Not valid key");
    });
  };

  return (
    <div className="container m-auto p-4">
      <h1 className=" text-center text-2xl w-full font-bold">
        Leaderboard GUI Panel
      </h1>
      <label htmlFor="apikey">Required API_KEY</label>
      <form className="mt-2" onSubmit={handleSubmit}>
        <Input
          id="apikey"
          name="key"
          placeholder="YOUR API KEY"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          aria-invalid={!!error}
        />
        {error && <p className=" text-destructive text-error mt-2">{error}</p>}
        <Button className="w-full mt-4">Authorize</Button>
      </form>
    </div>
  );
}
