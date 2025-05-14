import { getAccessToken } from "./getAccessToken";

const BASE_URL = process.env.API_END_POINT!;
const CLIENT_ID = process.env.CLIENT_ID!;
// const AUTH_TOKEN = process.env.AUTH_TOKEN!;
const DEFAULT_REVALIDATE = 1209600  // (86400 * 14) = 14 days

type RequestOptions = {
  revalidate?: number;
  headers?: Record<string, string>;
};

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  try {
    const token = await getAccessToken();

    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        Accept: "application/json",
        'x-auth-token': token,
        "x-client-id": CLIENT_ID,
        ...(options.headers || {}),
      },
      next: { revalidate: options.revalidate ?? DEFAULT_REVALIDATE },
    });

    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`);
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("apiFetch error:", path, "Error:", error);
    throw error;
  }
}

