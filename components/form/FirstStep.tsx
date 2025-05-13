import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles as sharedStyles } from "@/styles/childFormStyle";
import React, { memo, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import { GenderOption } from "../GenderOption";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

const StepOne = ({
  setStep,
  values,
  errors,
  touched,
  setFieldValue,
}: IStepFormProps & {
  setFieldValue: (field: string, value: any) => void;
}) => {
  const isNextDisabled = useMemo(
    () => !values.gender || !!errors?.gender,
    [values.gender, errors?.gender]
  );

  return (
    <Card
      title="Now, select your child's gender."
      subTitle="Gender"
      handleSubmit={undefined}
    >
      <ProgressBar step={2} totalSteps={16} />

      <View style={styles.genderOptionsContainer}>
        <GenderOption
          gender="male"
          selectedGender={values.gender}
          onPress={() => setFieldValue("gender", "male")}
          icon={require("@/assets/images/Boy.png")}
          label="Boy"
        />
        <GenderOption
          gender="female"
          selectedGender={values.gender}
          onPress={() => setFieldValue("gender", "female")}
          icon={require("@/assets/images/Girl.png")}
          label="Girl"
        />
      </View>

      {touched?.gender && errors?.gender && (
        <Text style={styles.errorText}>{errors?.gender}</Text>
      )}

      <View style={styles.spacer} />

      <StepBtnBox>
        <TouchableOpacity
          style={[sharedStyles.backBtn, styles.navButton]}
          onPress={() => setStep(0)}
        >
          <Text style={sharedStyles.stepNavActive}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            sharedStyles.backBtn,
            styles.navButton,
            isNextDisabled && styles.disabledButton,
          ]}
          onPress={() => !isNextDisabled && setStep(2)}
          disabled={isNextDisabled}
        >
          <Text style={sharedStyles.stepNavActive}>Next</Text>
        </TouchableOpacity>
      </StepBtnBox>
    </Card>
  );
};

export const styles = StyleSheet.create({
  genderOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  spacer: {
    height: 10,
  },
  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    flex: 1,
  },
  disabledButton: {
    backgroundColor: "#8d44ada6",
  },
});

export default memo(StepOne);
