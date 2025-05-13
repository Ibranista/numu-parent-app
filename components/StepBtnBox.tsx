import { View } from "react-native";

export default function StepBtnBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 50,
      }}
    >
      {children}
    </View>
  );
}
