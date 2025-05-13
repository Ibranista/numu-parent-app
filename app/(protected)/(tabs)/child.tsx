import FinalStep from "@/components/form/finalStep";
import StepOne from "@/components/form/FirstStep";
import InitialStep from "@/components/form/initialStep";
import LanguageStep from "@/components/form/LanguageStep";
import StepThree from "@/components/form/stepthree";
import StepThreeFormik from "@/components/form/stepThreeFormik";
import StepTwo from "@/components/form/steptwo";
import { createChild } from "@/features/child/thunkApi";
import { selectConcerns } from "@/features/concerns/selector";
import { getConcerns } from "@/features/concerns/thunk.api";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { childSchema } from "@/schema/childSchema";
import { styles } from "@/styles/childFormStyle";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  const dispatch = useAppDispatch();
  const concernData = useAppSelector(selectConcerns);
  const totalSteps = 6;
  const [step, setStep] = useState(-1);

  useEffect(() => {
    dispatch(getConcerns(1));
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        name: "",
        gender: "",
        birthDate: "",
        concern_ids: [],
        languages: [],
      }}
      validationSchema={childSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const result = await dispatch(
          createChild({
            gender: values.gender as "" | "male" | "female",
            birthDate: values.birthDate as unknown as Date,
            concern_ids: values.concern_ids,
            name: values.name,
          })
        );
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
        // Step navigation validation
        const canGoToStep = (idx: number) => {
          if (idx === 0) return true;
          if (idx === 1) return values.name && !errors.name;
          if (idx === 2) return values.name && values.gender && !errors.gender;
          if (idx === 3)
            return (
              values.name &&
              values.gender &&
              values.birthDate &&
              !errors.birthDate
            );
          if (idx === 4)
            return (
              values.name &&
              values.gender &&
              values.birthDate &&
              values.concern_ids.length > 0 &&
              !errors.concern_ids
            );
          if (idx === 5)
            return (
              values.name &&
              values.gender &&
              values.birthDate &&
              values.concern_ids.length > 0 &&
              values.languages &&
              values.languages.length > 0 &&
              !errors.concern_ids &&
              !errors.languages
            );
          return false;
        };
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
                  <StepThreeFormik
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
                <View style={styles.stepNavContainer}>
                  {[...Array(totalSteps)].map((_, idx) => {
                    const isDisabled = !canGoToStep(idx);
                    return (
                      <Text
                        key={idx}
                        style={[
                          styles.stepNav,
                          step === idx && styles.stepNavActive,
                          isDisabled && { opacity: 0.4 },
                        ]}
                        onPress={() => {
                          if (!isDisabled) setStep(idx);
                        }}
                      >
                        {idx + 1}
                      </Text>
                    );
                  })}
                </View>
              </>
            )}
          </View>
        );
      }}
    </Formik>
  );
}
