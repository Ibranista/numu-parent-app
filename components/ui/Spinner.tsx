import { ActivityIndicator, View, useColorScheme } from "react-native";

interface SpinnerProps {
  size?: "small" | "large" | number;
  color?: string;
}

export default function Spinner({ size = "large", color }: SpinnerProps) {
  const theme = useColorScheme();
  const spinnerColor = color || (theme === "dark" ? "#fff" : "#000");
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={size} color={spinnerColor} />
    </View>
  );
}
