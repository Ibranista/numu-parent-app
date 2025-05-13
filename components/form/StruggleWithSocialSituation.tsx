import { options, stylesToggle } from "@/constants/stepForm";
import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
  const selectedValue = values.struggle_with_social;

  const handleSelect = useCallback(
    (value: boolean) => {
      setFieldValue("struggle_with_social", value);
    },
    [setFieldValue]
  );

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
      <ProgressBar step={8} totalSteps={16} />
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
