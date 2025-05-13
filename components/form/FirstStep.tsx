import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function StepOne({
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
      title="Now, select your child's gender."
      subTitle="Gender"
      handleSubmit={undefined}
    >
      <ProgressBar step={2} totalSteps={6} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 25,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            padding: 10,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: values.gender === "male" ? "#8e44ad" : "#ccc",
            width: 90,
            backgroundColor: values.gender === "male" ? "#f7efff" : "#fff",
          }}
          onPress={() => setFieldValue("gender", "male")}
        >
          <Image
            source={require("@/assets/images/Boy.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ marginTop: 5, fontWeight: "500" }}>Boy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            padding: 10,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: values.gender === "female" ? "#8e44ad" : "#ccc",
            width: 90,
            backgroundColor: values.gender === "female" ? "#f7efff" : "#fff",
          }}
          onPress={() => setFieldValue("gender", "female")}
        >
          <Image
            source={require("@/assets/images/Girl.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ marginTop: 5, fontWeight: "500" }}>Girl</Text>
        </TouchableOpacity>
      </View>
      {touched?.gender && errors?.gender && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors?.gender}
        </Text>
      )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(0)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (!values.gender || errors?.gender) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() => values.gender && !errors?.gender && setStep(2)}
          disabled={!values.gender || !!errors?.gender}
        >
          <Text
            style={[
              styles.stepNavActive,
              (!values.gender || errors?.gender) && {
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
