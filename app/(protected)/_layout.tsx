import "@/global.css";
import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

const isLoggedIn = false;

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);
  console.log("auth state from protected layout-->", authState);
  if (!authState.isLoggedIn) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
