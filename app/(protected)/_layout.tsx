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
  console.log("currentUser on protected route", authUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
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
  if (!authUser?.user?.firebase_uid && !authUser?.user?.uid) {
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
