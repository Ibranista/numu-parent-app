import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function DidWeMissAnything({
  setStep,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}: IStepFormProps) {
  return (
    <Card
      title="Did we miss anything?"
      subTitle="Tell us more about your child"
      handleSubmit={undefined}
      StepIcon={undefined}
    >
      <ProgressBar step={15} totalSteps={16} />
      <View style={{ marginVertical: 16 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600" }}>
          Tell us more about your child
        </Text>
        <TextInput
          style={stylesTextArea.textArea}
          multiline
          numberOfLines={5}
          placeholder="Tell us more about your child"
          value={values.did_we_miss_anything}
          onChangeText={handleChange("did_we_miss_anything")}
          onBlur={handleBlur("did_we_miss_anything")}
        />
        {touched?.did_we_miss_anything && errors?.did_we_miss_anything && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
            {errors.did_we_miss_anything as string}
          </Text>
        )}
      </View>
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(13)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            errors?.did_we_miss_anything && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() => !errors?.did_we_miss_anything && setStep(15)}
          disabled={!!errors?.did_we_miss_anything}
        >
          <Text
            style={[
              styles.stepNavActive,
              errors?.did_we_miss_anything && {
                backgroundColor: "transparent",
              },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </StepBtnBox>
    </Card>
  );
}

const stylesTextArea = StyleSheet.create({
  textArea: {
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
});
