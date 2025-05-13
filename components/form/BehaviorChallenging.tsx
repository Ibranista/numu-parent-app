import { options, stylesToggle } from "@/constants/stepForm";
import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function BehaviorChallenging({
  setStep,
  values,
  errors,
  touched,
  setFieldValue,
}: IStepFormProps & {
  setFieldValue: (field: string, value: any) => void;
}) {
  const selectedValue = values.is_behavior_challenging;

  const handleSelect = useCallback(
    (value: boolean) => {
      setFieldValue("is_behavior_challenging", value);
    },
    [setFieldValue]
  );

  const hasError =
    touched?.is_behavior_challenging && errors?.is_behavior_challenging;

  const disableNext =
    typeof selectedValue !== "boolean" || !!errors?.is_behavior_challenging;

  return (
    <Card
      title="My child’s "
      subTitle="behaviour can be challenging"
      subTitle2="(e.g., tantrums, defiance, aggression)."
      handleSubmit={undefined}
      StepIcon={() => (
        <Image
          source={require("@/assets/images/childbr.png")}
          style={{ width: 40, height: 40, margin: "auto", marginBottom: 10 }}
        />
      )}
    >
      <ProgressBar step={7} totalSteps={16} />
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
      {hasError && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors.is_behavior_challenging as string}
        </Text>
      )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(5)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            disableNext && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() => !disableNext && setStep(7)}
          disabled={disableNext}
        >
          <Text
            style={[
              styles.stepNavActive,
              disableNext && {
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
