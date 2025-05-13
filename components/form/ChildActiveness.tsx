import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function ChildActiveness({
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
      subTitle="is very active and/or has trouble focusing"
      handleSubmit={undefined}
      StepIcon={() => (
        <Image
          source={require("@/assets/images/childbr.png")}
          style={{ width: 40, height: 40, margin: "auto", marginBottom: 10 }}
        />
      )}
    >
      {/* You may want to update step/totalSteps props as needed */}
      <ProgressBar step={8} totalSteps={10} />
      <View style={stylesToggle.toggleContainer}>
        {[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ].map((option) => {
          const isSelected = values.child_activeness === option.value;
          return (
            <TouchableOpacity
              key={option.label}
              onPress={() => setFieldValue("child_activeness", option.value)}
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
      {touched?.child_activeness && errors?.child_activeness && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors.child_activeness as string}
        </Text>
      )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(7)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (typeof values.child_activeness !== "boolean" || errors?.child_activeness) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() =>
            typeof values.child_activeness === "boolean" && !errors?.child_activeness && setStep(9)
          }
          disabled={typeof values.child_activeness !== "boolean" || !!errors?.child_activeness}
        >
          <Text
            style={[
              styles.stepNavActive,
              (typeof values.child_activeness !== "boolean" || errors?.child_activeness) && {
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
