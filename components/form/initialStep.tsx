import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import ProgressBar from "./progressBar";

export default function InitialStep({
  setStep,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: IStepFormProps) {
  return (
    <Card
      title={"Let's start with your child's name."}
      subTitle={"Tell us about your child."}
    >
      <ProgressBar step={1} totalSteps={5} />
      <Text style={{ marginBottom: 5, fontWeight: "500" }}>
        Child&apos;s Name
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          paddingHorizontal: 10,
          borderRadius: 8,
        }}
      >
        <TextInput
          style={{ flex: 1, height: 40 }}
          placeholder="Enter your child's name"
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
          value={values.name}
        />
      </View>
      {touched?.name && errors?.name && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors?.name}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.backBtn,
          (!values.name || errors?.name) && {
            backgroundColor: "#8d44ada6",
          },
        ]}
        onPress={() => values.name && !errors?.name && setStep(1)}
        disabled={!values.name || !!errors?.name}
      >
        <Text
          style={[
            styles.stepNavActive,
            (!values.name || errors?.name) && {
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
