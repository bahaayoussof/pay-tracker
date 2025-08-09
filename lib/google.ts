import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export type GoogleTokens = {
  accessToken: string;
  idToken?: string | null;
};

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export async function signInWithGoogle(
  clientId: string
): Promise<GoogleTokens | null> {
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  const request = new AuthSession.AuthRequest({
    clientId,
    redirectUri,
    scopes: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/drive.appdata",
    ],
    responseType: AuthSession.ResponseType.Token,
  });
  await request.promptAsync(discovery, { useProxy: true });
  // Note: For brevity, use interactive methods at screen level via useAuthRequest in future.
  return null;
}
