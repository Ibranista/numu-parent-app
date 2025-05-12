import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Card from "../Card";

interface StepThreeProps {
  onBack: () => void;
  onSubmit: () => void;
  name: string;
  gender: string;
}

export default function StepThree({
  onBack,
  onSubmit,
  name,
  gender,
}: StepThreeProps) {
  return (
    <Card
      title="Almost there!"
      subTitle="Review your child's information before submitting."
      handleSubmit={onSubmit}
      submitText="Submit"
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 20,
        }}
      >
        Review & Submit
      </Text>
      <Text style={{ marginBottom: 10 }}>
        Child&apos;s Name: <Text style={{ fontWeight: "bold" }}>{name}</Text>
      </Text>
      <Text style={{ marginBottom: 20 }}>
        Gender:{" "}
        <Text style={{ fontWeight: "bold" }}>
          {gender === "boy" ? "Boy" : gender === "girl" ? "Girl" : gender}
        </Text>
      </Text>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.prevText}>Back</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  prevText: {
    color: "#fff",
    fontWeight: "600",
  },
});
