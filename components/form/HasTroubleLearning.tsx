import { options, stylesToggle } from "@/constants/stepForm";
import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function HasTroubleLearning({
  setStep,
  values,
  errors,
  touched,
  setFieldValue,
}: IStepFormProps & {
  setFieldValue: (field: string, value: any) => void;
}) {
  const selectedValue = values.has_learning_problems;

  const handleSelect = useCallback(
    (value: boolean) => {
      setFieldValue("has_learning_problems", value);
    },
    [setFieldValue]
  );

  return (
    <Card
      title="My Child"
      subTitle="has trouble with learning or thinking tasks"
      subTitle2={
        "(e.g., memory, following instructions, problem-solving or understanding concepts)"
      }
      handleSubmit={undefined}
      StepIcon={() => (
        <Image
          source={require("@/assets/images/lampbrush.png")}
          style={{ width: 40, height: 40, margin: "auto", marginBottom: 10 }}
        />
      )}
    >
      <ProgressBar step={11} totalSteps={16} />
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
      {touched?.has_learning_problems && errors?.has_learning_problems && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors.has_learning_problems as string}
        </Text>
      )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(9)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (typeof values.has_learning_problems !== "boolean" ||
              errors?.has_learning_problems) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() =>
            typeof values.has_learning_problems === "boolean" &&
            !errors?.has_learning_problems &&
            setStep(11)
          }
          disabled={
            typeof values.has_learning_problems !== "boolean" ||
            !!errors?.has_learning_problems
          }
        >
          <Text
            style={[
              styles.stepNavActive,
              (typeof values.has_learning_problems !== "boolean" ||
                errors?.has_learning_problems) && {
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
