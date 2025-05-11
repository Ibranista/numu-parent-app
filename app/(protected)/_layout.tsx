import { clearAuth } from "@/features/auth/authSlice";
import { selectAuthUser } from "@/features/auth/selector";
import { getUserProfile } from "@/features/auth/thunkApi";
import { onAuthChange } from "@/firebaseConfig";
import "@/global.css";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const authUser = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      console.log("currentUser", currentUser);
      if (currentUser) {
        try {
          await dispatch(getUserProfile(currentUser.uid));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        dispatch(clearAuth());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Redirect based on auth state
  if (!authUser?.user?.firebase_uid) {
    return <Redirect href={"/login"} />;
  }
  console.log("authUser", authUser);
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
