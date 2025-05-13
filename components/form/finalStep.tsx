import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Card from "../Card";
import { renderField } from "../ui/Morefields";

export default function FinalStep({
  setStep,
  values,
  concernList,
  handleSubmit,
  isSubmitting,
}: IStepFormProps) {
  const getConcernTitles = () => {
    return values.concern_ids
      .map(
        (id: string) => concernList?.find((c: any) => c.id === id)?.title || id
      )
      .join(", ");
  };

  const reviewFields = [
    { label: "Child's Name", value: values.name, key: "name" },
    { label: "Gender", value: values.gender, key: "gender" },
    { label: "Birth Date", value: values.birthDate, key: "birthDate" },
    { label: "Concerns", value: getConcernTitles(), key: "concerns" },
    { label: "Languages", value: values.languages, key: "languages" },
    {
      label: "Emotional Distress Signs",
      value: values.has_emotional_distress_signs,
      key: "emotionalDistress",
    },
    {
      label: "Child Behavior",
      value: values.is_behavior_challenging,
      key: "behavior",
    },
    {
      label: "Can be challenging",
      value: values.is_behavior_challenging,
      key: "challenging",
    },
    {
      label: "Struggle with social",
      value: values.struggle_with_social,
      key: "socialStruggle",
    },
    {
      label: "Child Activeness",
      value: values.child_activeness,
      key: "activeness",
    },
    {
      label: "Difficulty Movement",
      value: values.has_difficulty_movement,
      key: "movement",
    },
    {
      label: "Trouble Learning",
      value: values.has_learning_problems,
      key: "learning",
    },
    {
      label: "Trouble Communication",
      value: values.has_communication_problems,
      key: "communication",
    },
    { label: "Meal Issues", value: values.has_meal_problems, key: "meals" },
    {
      label: "Sleep Issues",
      value: values.has_difficulty_with_sleep,
      key: "sleep",
    },
    { label: "Extra", value: values.did_we_miss_anything, key: "extra" },
  ];

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
        Review & Submit
      </Text>

      <ScrollView
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={true}
      >
        {reviewFields.map((field) =>
          renderField(field.label, field.value, field.key)
        )}
      </ScrollView>

      <TouchableOpacity style={styles.backBtn} onPress={() => setStep(14)}>
        <Text style={styles.stepNavActive}>Back</Text>
      </TouchableOpacity>
    </Card>
  );
}
