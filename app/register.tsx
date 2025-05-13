import { selectAuthUser } from "@/features/auth/selector";
import { registerUser } from "@/features/auth/thunkApi";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { initialState, registerUserSchema } from "@/schema/authSchema";
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

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const router = useRouter();
  const { loading, error } = authUser ?? {};

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: registerUserSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...payload } = values;
      const result = await dispatch(registerUser({ ...payload, role: "user" }));
      if (registerUser.fulfilled.match(result)) {
        Toast.show({
          type: "success",
          text1: "Registration successful!",
          position: "top",
          visibilityTime: 2000,
        });
        if (result.payload.uid) {
          router.replace("/");
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid Credentials!",
          position: "top",
          visibilityTime: 2000,
        });
      }
    },
  });

  return (
    <View className="flex-1 justify-center bg-gray-900 px-6">
      <Text className="text-white text-4xl font-bold mb-6">Register</Text>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="#9CA3AF"
        className={`bg-gray-700 text-white text-lg p-4 rounded mb-2 ${
          formik.touched.first_name && formik.errors.first_name
            ? "border-2 border-red-500"
            : ""
        }`}
        value={formik.values.first_name}
        onChangeText={formik.handleChange("first_name")}
        onBlur={formik.handleBlur("first_name")}
      />
      {formik.touched.first_name && formik.errors.first_name && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.first_name}
        </Text>
      )}
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#9CA3AF"
        className={`bg-gray-700 text-white text-lg p-4 rounded mb-2 ${
          formik.touched.last_name && formik.errors.last_name
            ? "border-2 border-red-500"
            : ""
        }`}
        value={formik.values.last_name}
        onChangeText={formik.handleChange("last_name")}
        onBlur={formik.handleBlur("last_name")}
      />
      {formik.touched.last_name && formik.errors.last_name && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.last_name}
        </Text>
      )}
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
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#9CA3AF"
        className={`bg-gray-700 text-white text-lg p-4 rounded mb-2 ${
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? "border-2 border-red-500"
            : ""
        }`}
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange("confirmPassword")}
        onBlur={formik.handleBlur("confirmPassword")}
        secureTextEntry
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.confirmPassword}
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
          <Text className="text-white text-xl font-semibold">Register</Text>
        )}
      </TouchableOpacity>
      {error && <Text className="text-red-500 text-base mt-4">{error}</Text>}
      <Text className="text-gray-400 text-base mt-4">
        Already have an account?{" "}
        <Text
          className="text-purple-500 font-semibold"
          onPress={() => router.replace("/login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

export default Register;
