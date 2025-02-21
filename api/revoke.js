import axios from "axios";
import qs from "qs";

const REVOKE_URL = "https://id.kick.com/oauth/revoke";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, token_hint_type } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    await axios.post(
      REVOKE_URL,
      qs.stringify({
        token,
        token_hint_type: token_hint_type || "access_token",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.status(200).send("Token revoked successfully");
  } catch (error) {
    console.error("Revoke Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "Revoke failed" });
  }
}
