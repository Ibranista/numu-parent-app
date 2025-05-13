import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Card from "../Card";

export default function FinalStep({
  setStep,
  values,
  concernList,
  handleSubmit,
  isSubmitting,
}: IStepFormProps) {
  return (
    <Card
      title="Almost there!"
      subTitle="Review your child's information before submitting."
      handleSubmit={handleSubmit}
      submitText={isSubmitting ? "Submitting..." : "Submit"}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 20,
        }}
      >
        Review &amp; Submit
      </Text>
      <ScrollView
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={true}
      >
        <Text style={{ marginBottom: 10 }}>
          Child&apos;s Name:{" "}
          <Text style={{ fontWeight: "bold" }}>{values.name}</Text>
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Gender: <Text style={{ fontWeight: "bold" }}>{values.gender}</Text>
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Birth Date:{" "}
          <Text style={{ fontWeight: "bold" }}>{values.birthDate}</Text>
        </Text>
        <Text style={{ marginBottom: 20 }}>
          Concerns:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.concern_ids
              .map((id: string) => {
                const found = concernList?.find((c: any) => c.id === id);
                return found ? found.title : id;
              })
              .join(", ")}
          </Text>
        </Text>
        <Text style={{ marginBottom: 20 }}>
          Languages:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.languages.join(", ")}
          </Text>
        </Text>
        {/* emotional distress signs */}
        <Text style={{ marginBottom: 20 }}>
          Emotional Distress Signs:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.has_emotional_distress_signs ? "Yes" : "No"}
          </Text>
        </Text>
        {/* child behavior */}
        <Text style={{ marginBottom: 20 }}>
          Child Behavior:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.is_behavior_challenging ? "Yes" : "No"}
          </Text>
        </Text>
        {/* Can be challenging */}
        <Text style={{ marginBottom: 20 }}>
          Can be challenging:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.is_behavior_challenging ? "Yes" : "No"}
          </Text>
        </Text>
        {/* Struggle with social */}
        <Text style={{ marginBottom: 20 }}>
          Struggle with social:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.struggle_with_social ? "Yes" : "No"}
          </Text>
        </Text>
        {/* child activness */}
        <Text style={{ marginBottom: 20 }}>
          Child Activeness:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.child_activeness ? "Yes" : "No"}
          </Text>
        </Text>
        {/* child difficulty movement */}
        <Text style={{ marginBottom: 20 }}>
          Difficulty Movement:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.has_difficulty_movement ? "Yes" : "No"}
          </Text>
        </Text>
        {/* has trouble learning */}
        <Text style={{ marginBottom: 20 }}>
          Trouble Learning:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {values.has_learning_problems ? "Yes" : "No"}
          </Text>
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.backBtn} onPress={() => setStep(10)}>
        <Text style={styles.stepNavActive}>Back</Text>
      </TouchableOpacity>
    </Card>
  );
}
