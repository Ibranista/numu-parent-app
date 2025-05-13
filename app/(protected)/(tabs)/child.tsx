import BehaviorChallenging from "@/components/form/BehaviorChallenging";
import ChildActiveness from "@/components/form/ChildActiveness";
import DidWeMissAnything from "@/components/form/DidWeMissAnything";
import DifficultyMovement from "@/components/form/DifficultyMovement";
import FinalStep from "@/components/form/finalStep";
import StepOne from "@/components/form/FirstStep";
import HasTroubleLearning from "@/components/form/HasTroubleLearning";
import HasTroubleWithCommunication from "@/components/form/HasTroubleWithCommunication";
import InitialStep from "@/components/form/initialStep";
import LanguageStep from "@/components/form/LanguageStep";
import MealBehavior from "@/components/form/MealBehavior";
import MyChildBehavior from "@/components/form/MyChildBehavior";
import SleepDifficulties from "@/components/form/SleepDifficulties";
import StepThree from "@/components/form/stepthree";
import StepTwoFormik from "@/components/form/stepThreeFormik";
import StepTwo from "@/components/form/steptwo";
import StruggleWithSocialSituation from "@/components/form/StruggleWithSocialSituation";
import { createChild } from "@/features/child/thunkApi";
import { selectConcerns } from "@/features/concerns/selector";
import { getConcerns } from "@/features/concerns/thunk.api";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { childInitialState, childSchema } from "@/schema/childSchema";
import { styles } from "@/styles/childFormStyle";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  const dispatch = useAppDispatch();
  const concernData = useAppSelector(selectConcerns);
  const totalSteps = 16;
  const [step, setStep] = useState(-1);

  useEffect(() => {
    dispatch(getConcerns(1));
  }, [dispatch]);

  return (
    <Formik
      initialValues={childInitialState}
      validationSchema={childSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        // const payload = {
        //   gender: values.gender as "" | "male" | "female",
        //   birthDate: values.birthDate as unknown as Date,
        //   concern_ids: values.concern_ids,
        //   name: values.name,
        //   has_emotional_distress_signs: values.has_emotional_distress_signs,
        //   is_behavior_challenging: values.is_behavior_challenging,
        //   languages: values.languages,
        //   struggle_with_social: values.struggle_with_social,
        //   child_activeness: values.child_activeness,
        //   has_difficulty_movement: values.has_difficulty_movement,
        //   has_learning_problems: values.has_learning_problems,
        //   has_communication_problems: values.has_communication_problems,
        //   has_meal_problems: values.has_meal_problems,
        //   has_difficulty_with_sleep: values.has_difficulty_with_sleep,
        //   did_we_miss_anything: values.did_we_miss_anything,
        // };
        // console.log("payload", payload);
        const result = await dispatch(createChild(values));
        console.log("result", result);
        setSubmitting(false);
        if (createChild.fulfilled.match(result)) {
          Toast.show({
            type: "success",
            text1: "Child created successfully!",
            position: "top",
            visibilityTime: 2000,
          });
          resetForm();
          setStep(-1);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => {
        const concernList = concernData?.concerns?.results || [];
        // Render steps
        const renderStep = () => {
          switch (step) {
            case 0:
              return (
                <InitialStep
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setStep={setStep}
                  touched={touched}
                  values={values}
                />
              );
            case 1:
              return (
                <StepOne
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 2:
              return (
                <StepTwo setStep={setStep} values={values} errors={errors}>
                  <StepTwoFormik
                    value={values.birthDate}
                    error={touched.birthDate && errors.birthDate}
                    onChange={(date: string) =>
                      setFieldValue("birthDate", date)
                    }
                  />
                </StepTwo>
              );
            case 3:
              return (
                <StepThree
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  concernList={concernList}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 4:
              return (
                <LanguageStep
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 5:
              return (
                <MyChildBehavior
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 6:
              return (
                <BehaviorChallenging
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 7:
              return (
                <StruggleWithSocialSituation
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 8:
              return (
                <ChildActiveness
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 9:
              return (
                <DifficultyMovement
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 10:
              return (
                <HasTroubleLearning
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 11:
              return (
                <HasTroubleWithCommunication
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 12:
              return (
                <MealBehavior
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 13:
              return (
                <SleepDifficulties
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            case 14:
              return (
                <DidWeMissAnything
                  setStep={setStep}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              );
            case 15:
              return (
                <FinalStep
                  setStep={setStep}
                  values={values}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  concernList={concernList}
                />
              );
            default:
              return null;
          }
        };
        return (
          <View style={styles.container}>
            {step === -1 ? (
              <View>
                <View style={{ alignItems: "center", marginBottom: 32 }}>
                  <Image
                    source={require("@/assets/images/form-intro.png")}
                    style={{ width: 200, height: 200, marginBottom: 20 }}
                  />
                  <Text style={styles.welcome} className="font-bold">
                    Welcome to Numuw!
                  </Text>
                  <Text style={styles.info}>
                    Your insight is key to helping us understand your child
                    better. By answering these short questions, you’ll help us
                    provide the best support and personalized care for your
                    child’s Needs
                  </Text>
                  <TouchableOpacity
                    onPress={() => setStep(0)}
                    style={styles.tellUsBtn}
                  >
                    <Image
                      source={require("@/assets/images/hand-gesture.png")}
                    />
                    <Text style={{ color: "#fff" }}>
                      Tell Us About Your Child
                    </Text>
                    <Image
                      source={require("@/assets/images/right-arrow.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                {renderStep()}
                {step > -1 && step !== 15 && (
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 16,
                      marginBottom: 12,
                      marginRight: 20,
                    }}
                  >
                    Question {step + 1} of {totalSteps}
                  </Text>
                )}
              </>
            )}
          </View>
        );
      }}
    </Formik>
  );
}
