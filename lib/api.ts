import { getAccessToken } from "@/lib";

const BASE_URL = process.env.API_END_POINT!;
const CLIENT_ID = process.env.CLIENT_ID!;
const DEFAULT_REVALIDATE = 1209600  // (86400 * 14) = 14 days

type RequestOptions = {
  revalidate?: number;
  headers?: Record<string, string>;
};

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = await getAccessToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'x-auth-token': token,
      'x-client-id': CLIENT_ID,
      ...(options.headers || {}),
    },
    next: { revalidate: options.revalidate ?? DEFAULT_REVALIDATE },
  });

  if (!res.ok) {
    const message = `API error: ${res.status} ${res.statusText}`;
    console.error(message);
    throw new Error(message);
  }

  return res.json();
}
