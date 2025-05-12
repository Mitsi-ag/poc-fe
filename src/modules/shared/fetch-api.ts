import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";

const API_BACKEND_URL = "http://170.64.164.95";
const TOKEN_KEY = "a1621bfcdb771b000319086f6c80f6f4450d63bc";

// Base fetch utility for all API calls
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const defaultHeaders = {
    Authorization: `Token ${TOKEN_KEY}`,
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BACKEND_URL}/api/v1/${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    console.log("Error", error);
    throw new Error(error.message || DEFAULT_ERROR_MESSAGE);
  }

  return response.json();
}
