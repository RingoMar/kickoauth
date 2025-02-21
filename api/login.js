import crypto from "crypto";

const CLIENT_ID = process.env.KICK_CLIENT_ID;
const REDIRECT_URI = process.env.CALLBACK_LINK || "http://localhost:3000/api/callback";
const AUTH_URL = "https://id.kick.com/oauth/authorize";

const codeVerifiers = new Map();

export default function handler(req, res) {
  const state = crypto.randomBytes(16).toString("hex");
  const verifier = crypto.randomBytes(32).toString("hex");
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

  codeVerifiers.set(state, verifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "channel:read user:read",
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
  });

  res.redirect(`${AUTH_URL}?${params.toString()}`);
}

export { codeVerifiers };
