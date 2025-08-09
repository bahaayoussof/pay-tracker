import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  useAuthRequest,
  makeRedirectUri,
  ResponseType,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { BlurView } from "expo-blur";
import { useAuthStore } from "../../store/auth";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID"; // TODO: replace via env

export default function AuthScreen() {
  const setToken = useAuthStore((s) => s.setToken);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: [
        "openid",
        "profile",
        "email",
        "https://www.googleapis.com/auth/drive.appdata",
      ],
      responseType: ResponseType.Token,
      redirectUri: makeRedirectUri({ useProxy: true }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      setToken(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <View className="flex-1 bg-neutral-100 dark:bg-neutral-900 px-4 py-6">
      <BlurView
        intensity={30}
        tint="light"
        className="rounded-2xl overflow-hidden"
      >
        <View className="p-6 items-center">
          <Text className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Sign in with Google
          </Text>
          <TouchableOpacity
            className="bg-neutral-800 rounded-xl px-6 py-3"
            disabled={!request}
            onPress={() => promptAsync({ useProxy: true })}
          >
            <Text className="text-white font-semibold">Continue</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}
