import axios from "axios";
import qs from "qs";
import { codeVerifiers } from "./login.js";

const CLIENT_ID = process.env.KICK_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.CALLBACK_LINK || "http://localhost:3000/api/callback";
const TOKEN_URL = "https://id.kick.com/oauth/token";

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: "Missing code or state parameter" });
  }

  const codeVerifier = codeVerifiers.get(state);
  if (!codeVerifier) {
    return res.status(400).json({ error: "Invalid or expired state" });
  }

  try {
    const response = await axios.post(
      TOKEN_URL,
      qs.stringify({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
        code,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    codeVerifiers.delete(state);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Token Exchange Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "Token exchange failed" });
  }
}
