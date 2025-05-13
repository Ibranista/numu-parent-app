import { IGenderOptionProps } from "@/Interface/childFormInterface";
import { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export const GenderOption = memo(
  ({ gender, selectedGender, onPress, icon, label }: IGenderOptionProps) => (
    <TouchableOpacity
      style={[
        styles.genderOption,
        selectedGender === gender && styles.selectedGenderOption,
        { borderColor: selectedGender === gender ? "#8e44ad" : "#ccc" },
      ]}
      onPress={onPress}
    >
      <Image source={icon} style={styles.genderIcon} />
      <Text style={styles.genderLabel}>{label}</Text>
    </TouchableOpacity>
  )
);

GenderOption.displayName = "GenderOption";

const styles = StyleSheet.create({
  genderOption: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    width: 90,
    backgroundColor: "#fff",
  },

  selectedGenderOption: {
    backgroundColor: "#f7efff",
  },
  genderIcon: {
    width: 24,
    height: 24,
  },
  genderLabel: {
    marginTop: 5,
    fontWeight: "500",
  },
});
