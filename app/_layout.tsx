import "@/global.css";
import { persistor, store } from "@/store/store";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
        <Toast />
      </PersistGate>
    </Provider>
  );
}
