import { stylesToggle } from "@/constants/stepForm";
import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function ChildBehavior({
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
      subTitle="often seems sad, anxious, or complains of physical pains"
      handleSubmit={undefined}
      StepIcon={() => (
        <Image
          source={require("@/assets/images/childbr.png")}
          style={{ width: 40, height: 40, margin: "auto", marginBottom: 10 }}
        />
      )}
    >
      <ProgressBar step={6} totalSteps={16} />
      <View style={stylesToggle.toggleContainer}>
        {[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ].map((option) => {
          const isSelected =
            values.has_emotional_distress_signs === option.value;
          return (
            <TouchableOpacity
              key={option.label}
              onPress={() =>
                setFieldValue("has_emotional_distress_signs", option.value)
              }
              style={[
                stylesToggle.toggleButton,
                isSelected && stylesToggle.toggleButtonSelected,
              ]}
              activeOpacity={0.8}
            >
              <View style={stylesToggle.iconCircle}>
                {option?.value ? (
                  <Image
                    source={require("@/assets/images/right_icon.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    source={require("@/assets/images/x_icon.png")}
                    style={{ width: 20, height: 20 }}
                  />
                )}
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
      {touched?.has_emotional_distress_signs &&
        errors?.has_emotional_distress_signs && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
            {errors.has_emotional_distress_signs as string}
          </Text>
        )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(4)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (typeof values.has_emotional_distress_signs !== "boolean" ||
              errors?.has_emotional_distress_signs) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() =>
            typeof values.has_emotional_distress_signs === "boolean" &&
            !errors?.has_emotional_distress_signs &&
            setStep(6)
          }
          disabled={
            typeof values.has_emotional_distress_signs !== "boolean" ||
            !!errors?.has_emotional_distress_signs
          }
        >
          <Text
            style={[
              styles.stepNavActive,
              (typeof values.has_emotional_distress_signs !== "boolean" ||
                errors?.has_emotional_distress_signs) && {
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
