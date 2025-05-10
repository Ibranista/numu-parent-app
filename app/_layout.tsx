import "@/global.css";
import { store } from "@/store/store";

import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
