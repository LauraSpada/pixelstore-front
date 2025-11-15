import api from "./api";

export type LoginPayload = {
  name: string;
  password: string;
};

export type LoginResult = {
  ok: boolean;
  token?: string;
  user?: any;   
  error?: string;
};

const TOKEN_KEY = "auth_token";

export async function login(payload: LoginPayload): Promise<LoginResult> {
  try {
    const { data } = await api.post("/auth/login", payload);

    if (!data?.token) {
      return { ok: false, error: "Response without Token." };
    }

    if (!isValidJwt(data.token)) {
      return { ok: false, error: "Token expired or invalid." };
    }

    localStorage.setItem("auth_token", data.token);

    if (data.user) {
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    }

    return { ok: true, token: data.token };

  } catch (error: any) {
    const message =
      error.response?.data?.error ||
      error.message ||
      "Authenticate error.";
    return { ok: false, error: message };
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isValidJwt(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp < Date.now() / 1000) return false;
    return true;
  } catch {
    return false;
  }
}
