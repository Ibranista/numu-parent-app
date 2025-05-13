import { options, stylesToggle } from "@/constants/stepForm";
import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function SleepDifficulties({
  setStep,
  values,
  errors,
  touched,
  setFieldValue,
}: IStepFormProps & {
  setFieldValue: (field: string, value: any) => void;
}) {
  const selectedValue = values.has_difficulty_with_sleep;

  const handleSelect = useCallback(
    (value: boolean) => {
      setFieldValue("has_difficulty_with_sleep", value);
    },
    [setFieldValue]
  );
  return (
    <Card
      title="My Child"
      subTitle="has difficulty with sleep"
      subTitle2={"(e.g., falling asleep, waking up frequently)"}
      handleSubmit={undefined}
      StepIcon={() => (
        <Image
          source={require("@/assets/images/sleep_icon.png")}
          style={{ width: 40, height: 40, margin: "auto", marginBottom: 10 }}
        />
      )}
    >
      <ProgressBar step={14} totalSteps={16} />
      <View style={stylesToggle.toggleContainer}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={option.label}
              onPress={() => handleSelect(option.value)}
              style={[
                stylesToggle.toggleButton,
                isSelected && stylesToggle.toggleButtonSelected,
              ]}
              activeOpacity={0.8}
            >
              <View style={stylesToggle.iconCircle}>
                <Image source={option.icon} style={{ width: 20, height: 20 }} />
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
      {touched?.has_difficulty_with_sleep &&
        errors?.has_difficulty_with_sleep && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
            {errors.has_difficulty_with_sleep as string}
          </Text>
        )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(12)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (typeof values.has_difficulty_with_sleep !== "boolean" ||
              errors?.has_difficulty_with_sleep) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() =>
            typeof values.has_difficulty_with_sleep === "boolean" &&
            !errors?.has_difficulty_with_sleep &&
            setStep(14)
          }
          disabled={
            typeof values.has_difficulty_with_sleep !== "boolean" ||
            !!errors?.has_difficulty_with_sleep
          }
        >
          <Text
            style={[
              styles.stepNavActive,
              (typeof values.has_difficulty_with_sleep !== "boolean" ||
                errors?.has_difficulty_with_sleep) && {
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
