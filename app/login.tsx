import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { loginInitialState, loginSchema } from "@/schema/authSchema";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { selectAuthUser } from "../features/auth/selector";
import { loginUser } from "../features/auth/thunkApi";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const router = useRouter();
  const { loading, error } = authUser ?? {};

  const formik = useFormik({
    initialValues: loginInitialState,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  React.useEffect(() => {
    if (authUser?.user?.firebase_uid) {
      Toast.show({
        type: "success",
        text1: "Successfully logged in!",
        position: "top",
        visibilityTime: 2000,
      });
      router.replace("/");
    }
  }, [authUser?.user?.firebase_uid, router]);

  return (
    <View className="flex-1 justify-center bg-gray-900 px-6">
      <Text className="text-white text-4xl font-bold mb-6">Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        className={`bg-gray-700 text-white text-lg p-4 rounded mb-2 ${
          formik.touched.email && formik.errors.email
            ? "border-2 border-red-500"
            : ""
        }`}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {formik.touched.email && formik.errors.email && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.email}
        </Text>
      )}

      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        className={`bg-gray-700 text-white text-lg p-4 rounded mb-2 ${
          formik.touched.password && formik.errors.password
            ? "border-2 border-red-500"
            : ""
        }`}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.password}
        </Text>
      )}

      <TouchableOpacity
        disabled={loading}
        onPress={formik.handleSubmit as () => void}
        className={`w-full p-4 rounded items-center mt-2 ${
          loading ? "bg-purple-400 opacity-50" : "bg-purple-500"
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-xl font-semibold">Login</Text>
        )}
      </TouchableOpacity>

      {error && (
        <Text className="text-red-500 text-base mt-4">Invalid Credentials</Text>
      )}
    </View>
  );
};

export default Login;
