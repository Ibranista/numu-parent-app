import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import { Checkbox } from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function StepThree({
  setStep,
  values,
  errors,
  concernList,
  touched,
  setFieldValue,
}: IStepFormProps & {
  setFieldValue: (field: string, value: any) => void;
}) {
  const toggleConcern = (id: string) => {
    const currentIds = values.concern_ids || [];
    if (currentIds.includes(id)) {
      setFieldValue(
        "concern_ids",
        currentIds.filter((itemId: string) => itemId !== id)
      );
    } else {
      setFieldValue("concern_ids", [...currentIds, id]);
    }
  };

  return (
    <Card
      title="What are your concerns?"
      subTitle="Select all that apply"
      handleSubmit={undefined}
    >
      <ProgressBar step={4} totalSteps={5} />
      <View style={localStyles.gridContainer}>
        {concernList &&
          concernList.map((concern: any) => {
            const isSelected = values.concern_ids?.includes(concern.id);
            return (
              <LinearGradient
                key={concern.id}
                colors={["#d1b3e0", "#8e44ad"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={[
                  localStyles.gradientBorder,
                  isSelected && localStyles.gradientSelected,
                ]}
              >
                <TouchableOpacity
                  key={concern.id}
                  onPress={() => toggleConcern(concern.id)}
                  activeOpacity={0.8}
                  style={[
                    localStyles.concernCard,
                    isSelected && localStyles.concernCardSelected,
                  ]}
                >
                  <Checkbox
                    value={isSelected}
                    onValueChange={() => toggleConcern(concern.id)}
                    color={isSelected ? "#8e44ad" : undefined}
                    style={localStyles.checkbox}
                  />
                  <View style={localStyles.textContainer}>
                    <Text style={localStyles.title}>{concern.title}</Text>
                    {concern.description && (
                      <Text style={localStyles.description}>
                        {concern.description}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            );
          })}
      </View>

      {touched?.concern_ids && errors?.concern_ids && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors?.concern_ids as string}
        </Text>
      )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(2)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (values.concern_ids.length === 0 || errors?.concern_ids) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() =>
            values.concern_ids.length > 0 && !errors?.concern_ids && setStep(4)
          }
          disabled={values.concern_ids.length === 0 || !!errors?.concern_ids}
        >
          <Text
            style={[
              styles.stepNavActive,
              (values.concern_ids.length === 0 || errors?.concern_ids) && {
                backgroundColor: "transparent",
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </StepBtnBox>
    </Card>
  );
}

const localStyles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  gradientBorder: {
    width: "48%",
    borderRadius: 16,
    marginBottom: 12,
    padding: 2,
    // Add this to enforce uniform height
    minHeight: 100, // Or any height that works for your layout
  },
  gradientSelected: {
    shadowColor: "#8e44ad",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  concernCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    flex: 1,
    height: "100%",
  },
  concernCardSelected: {
    borderColor: "#8e44ad",
    borderWidth: 1,
    shadowColor: "#8e44ad",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    backgroundColor: "#f5e9fb",
  },
  checkbox: {
    marginRight: 10,
    marginTop: 4,
    borderRadius: 4,
    borderColor: "#E5E5E5",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
});
