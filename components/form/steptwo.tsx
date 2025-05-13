import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function StepTwo({
  setStep,
  values,
  errors,
  children,
}: IStepFormProps) {
  return (
    <Card
      title="Different age groups require different approaches"
      subTitle="When was your child's Birthday?"
      handleSubmit={undefined}
      StepIcon={() => (
        <Image
          source={require("@/assets/images/cake.png")}
          style={{ width: 40, height: 40, margin: "auto", marginBottom: 10 }}
        />
      )}
    >
      <ProgressBar step={3} totalSteps={5} />
      {children}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(1)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (!values.birthDate || errors?.birthDate) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() => values.birthDate && !errors?.birthDate && setStep(3)}
          disabled={!values.birthDate || !!errors?.birthDate}
        >
          <Text
            style={[
              styles.stepNavActive,
              (!values.birthDate || errors?.birthDate) && {
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
