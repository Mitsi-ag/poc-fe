import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";

const API_BACKEND_URL = "http://170.64.164.95";

import { cookies } from "next/headers";

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  const headers = {
    Authorization: authToken ? `Token ${authToken}` : "",
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_BACKEND_URL}/api/v1/${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    console.log("Error at fetch-api", error);
    throw new Error(error.message || DEFAULT_ERROR_MESSAGE);
  }

  return response.json();
}
