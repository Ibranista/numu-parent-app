import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import ProgressBar from "./progressBar";

export default function StepTwo({
  setStep,
  values,
  errors,
  children,
}: IStepFormProps) {
  return (
    <Card
      title="When was your child born?"
      subTitle="Birth Date"
      handleSubmit={undefined}
    >
      <ProgressBar step={3} totalSteps={5} />
      {children}
      <View style={{ height: 10 }} />
      <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
        <Text style={styles.stepNavActive}>Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.backBtn,
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
    </Card>
  );
}
