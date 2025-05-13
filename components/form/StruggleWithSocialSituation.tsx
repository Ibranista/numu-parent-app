import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function StruggleWithSocialSituation({
  setStep,
  values,
  errors,
  touched,
  setFieldValue,
}: IStepFormProps & {
  setFieldValue: (field: string, value: any) => void;
}) {
  return (
    <Card
      title="My Child"
      subTitle="struggles with social situations"
      subTitle2={"(e.g., feels left out, prefers to be alone)"}
      handleSubmit={undefined}
      StepIcon={() => (
        <Image
          source={require("@/assets/images/childbr.png")}
          style={{ width: 40, height: 40, margin: "auto", marginBottom: 10 }}
        />
      )}
    >
      {/* You may want to update step/totalSteps props as needed */}
      <ProgressBar step={9} totalSteps={10} />
      <View style={stylesToggle.toggleContainer}>
        {[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ].map((option) => {
          const isSelected = values.struggle_with_social === option.value;
          return (
            <TouchableOpacity
              key={option.label}
              onPress={() =>
                setFieldValue("struggle_with_social", option.value)
              }
              style={[
                stylesToggle.toggleButton,
                isSelected && stylesToggle.toggleButtonSelected,
              ]}
              activeOpacity={0.8}
            >
              <View style={stylesToggle.iconCircle}>
                <Text style={{ color: "#fff", fontSize: 12 }}>
                  {option.value ? "✔" : "✖"}
                </Text>
              </View>
              <Text
                style={[
                  stylesToggle.toggleText,
                  isSelected && stylesToggle.toggleTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {touched?.struggle_with_social && errors?.struggle_with_social && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors.struggle_with_social as string}
        </Text>
      )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(6)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (typeof values.struggle_with_social !== "boolean" ||
              errors?.struggle_with_social) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() =>
            typeof values.struggle_with_social === "boolean" &&
            !errors?.struggle_with_social &&
            setStep(8)
          }
          disabled={
            typeof values.struggle_with_social !== "boolean" ||
            !!errors?.struggle_with_social
          }
        >
          <Text
            style={[
              styles.stepNavActive,
              (typeof values.struggle_with_social !== "boolean" ||
                errors?.struggle_with_social) && {
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

const stylesToggle = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 16,
  },
  toggleButton: {
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  toggleButtonSelected: {
    borderColor: "#8e44ad",
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4d4d4d",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  toggleText: {
    fontSize: 14,
    color: "#333",
  },
  toggleTextSelected: {
    fontWeight: "600",
  },
});
