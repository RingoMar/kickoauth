import axios from "axios";
import qs from "qs";

const CLIENT_ID = process.env.KICK_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TOKEN_URL = "https://id.kick.com/oauth/token";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const response = await axios.post(
      TOKEN_URL,
      qs.stringify({
        grant_type: "refresh_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Refresh Token Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "Refresh failed" });
  }
}
