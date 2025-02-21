# Kick OAuth 2.1 Serverless Function

This project implements a serverless OAuth 2.1 flow for the Kick Dev API using TypeScript and Vercel. It provides endpoints to initiate the authorization process and exchange authorization codes for access tokens.

# Configure Environment Variables

Create a .env file in the root directory with the following:

```
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here
REDIRECT_URI=https://your-vercel-app.vercel.app/api/callback
```

- Replace your_client_id_here and your_client_secret_here with values from your Kick App settings.
- Update REDIRECT_URI to match your deployed Vercel URL after deployment.

# Register Redirect URI

- Log in to the Kick Developer Portal.
- Create or edit your app, and set the Redirect URI to `https://your-vercel-app.vercel.app/api/callback` (use your Vercel domain after deployment).

# Endpoints

- `/api/login` (`GET`):
  - Redirects to Kick’s authorization server with PKCE parameters.
  - Query Params: None required.
  - Response: Redirects to `https://id.kick.com/oauth/authorize`.
- `/api/callback` (`GET`):
  - Exchanges the authorization code for tokens.
  - Query Params: code (authorization code), state (state parameter).
  - Response: JSON with access_token, refresh_token, etc., or an error.
