// authenticate
//
// Path: src/services/authService.ts
export async function authenticate(email: string, password: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_GO_API_URL + "/api/account/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  // { Error: "Wrong Email or Password" }
  const data = await res.json();
  if (data.Error) {
    throw new Error(data.Error);
  }
  return data;
}

// /api/auth/google [post]
export async function googleAuthenticate(token: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_GO_API_URL + "/api/auth/google",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return data;
}
