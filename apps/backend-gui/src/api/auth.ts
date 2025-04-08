export async function login(key: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key }),
  });

  if (res.ok) {
    const { token } = (await res.json()) as { token: string };
    return token;
  }
  return undefined;
}
