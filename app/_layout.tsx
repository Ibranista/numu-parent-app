import "@/global.css";
import { store } from "@/store/store";
import { AuthProvider } from "@/utils/authContext";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          <Stack.Screen
            name="+not-found"
            options={{
              title: "Not Found",
              headerShown: false,
            }}
          />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
