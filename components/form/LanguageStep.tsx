import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import { Checkbox } from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function LanguageStep({
  setStep,
  values,
  errors,
  touched,
  setFieldValue,
}: IStepFormProps & {
  setFieldValue: (field: string, value: any) => void;
}) {
  // Note: replace with backend enum field if you have tme.
  const languages = [
    { id: "arabic", title: "Arabic" },
    { id: "english", title: "English" },
    { id: "french", title: "French" },
    { id: "spanish", title: "Spanish" },
    { id: "hindi", title: "Hindi" },
    { id: "bengali", title: "Bengali" },
    { id: "tagalog", title: "Tagalog" },
    { id: "urdu", title: "Urdu" },
    { id: "farsi", title: "Farsi" },
  ];

  const toggleLanguage = (id: string) => {
    const currentIds = values.languages || [];
    if (currentIds.includes(id)) {
      setFieldValue(
        "languages",
        currentIds.filter((itemId: string) => itemId !== id)
      );
    } else {
      setFieldValue("languages", [...currentIds, id]);
    }
  };

  return (
    <Card
      title="Select all that apply"
      subTitle="Which languages does your child speak?"
      handleSubmit={undefined}
      StepIcon={() => (
        <Image
          source={require("@/assets/images/languagesIcon.png")}
          style={{ width: 40, height: 40, margin: "auto", marginBottom: 10 }}
        />
      )}
    >
      <ProgressBar step={5} totalSteps={6} />
      <View style={localStyles.gridContainer}>
        {languages.map((lang) => {
          const isSelected = values.languages?.includes(lang.id);
          return (
            <LinearGradient
              key={lang.id}
              colors={["#d1b3e0", "#8e44ad"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={[
                localStyles.gradientBorder,
                isSelected && localStyles.gradientSelected,
              ]}
            >
              <TouchableOpacity
                key={lang.id}
                onPress={() => toggleLanguage(lang.id)}
                activeOpacity={0.8}
                style={[
                  localStyles.concernCard,
                  isSelected && localStyles.concernCardSelected,
                ]}
              >
                <View style={localStyles.textContainer}>
                  <Text style={localStyles.title}>{lang.title}</Text>
                </View>
                <Checkbox
                  value={isSelected}
                  onValueChange={() => toggleLanguage(lang.id)}
                  color={isSelected ? "#8e44ad" : undefined}
                  style={localStyles.checkbox}
                />
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </View>

      {touched?.languages && errors?.languages && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors?.languages as string}
        </Text>
      )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(3)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (values.languages.length === 0 || errors?.languages) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() =>
            values.languages.length > 0 && !errors?.languages && setStep(5)
          }
          disabled={values.languages.length === 0 || !!errors?.languages}
        >
          <Text
            style={[
              styles.stepNavActive,
              (values.languages.length === 0 || errors?.languages) && {
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

const localStyles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  gradientBorder: {
    width: "48%",
    borderRadius: 12,
    marginBottom: 10,
    padding: 1.5,
    minHeight: 50,
  },
  gradientSelected: {
    shadowColor: "#8e44ad",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  concernCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flex: 1,
    height: "100%",
  },
  concernCardSelected: {
    borderColor: "#8e44ad",
    borderWidth: 1,
    shadowColor: "#8e44ad",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    marginLeft: 10,
    borderRadius: 4,
    borderColor: "#E5E5E5",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
  },
});
