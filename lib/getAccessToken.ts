import axios from "axios";

let buildTimeToken: string | null = null;

export async function getAccessToken(): Promise<string> {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const tokenUrl = process.env.TOKEN_END_POINT;

  if (!clientId || !clientSecret || !tokenUrl) {
    console.error("Missing env vars");
    return "";
  }

  if (process.env.NODE_ENV === "production" && buildTimeToken) {
    return buildTimeToken;
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const res = await axios.post(
      tokenUrl,
      "grant_type=client_credentials&scope=content",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = res.data;

    if (process.env.NODE_ENV === "production") {
      buildTimeToken = access_token;
    }

    return access_token;
  } catch (err) {
    console.error("Token fetch error:", err);
    return "";
  }
}
