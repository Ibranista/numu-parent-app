import { Text } from "react-native";

export const renderField = (
  label: string,
  value: string | boolean | string[],
  key: string
) => {
  if (typeof value === "boolean") {
    value = value ? "Yes" : "No";
  } else if (Array.isArray(value)) {
    value = value.join(", ");
  }

  return (
    <Text key={key} style={{ marginBottom: 20 }}>
      {label}: <Text style={{ fontWeight: "bold" }}>{value}</Text>
    </Text>
  );
};
