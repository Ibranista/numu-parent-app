import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Yup from "yup";
import Card from "../Card";
import ProgressBar from "./progressBar";

interface StepOneProps {
  onNext: (name: string) => void;
  initialName?: string;
}

export default function StepOne({ onNext, initialName = "" }: StepOneProps) {
  return (
    <Formik
      initialValues={{ childName: initialName }}
      validationSchema={Yup.object({
        childName: Yup.string().required("Name is required"),
      })}
      onSubmit={(values) => onNext(values.childName)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Card
          title={"Let&apos;s start with your child&apos;s name."}
          subTitle={"Tell us about your child."}
          handleSubmit={handleSubmit}
        >
          <ProgressBar step={1} totalSteps={3} />
          <Text style={styles.label}>Child&apos;s Name</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter your child's name"
              onChangeText={handleChange("childName")}
              onBlur={handleBlur("childName")}
              value={values.childName}
            />
            <Icon
              name="user"
              size={20}
              color="#ccc"
              style={{ marginLeft: 10 }}
            />
          </View>
          {touched.childName && errors.childName && (
            <Text style={styles.error}>{errors.childName}</Text>
          )}
        </Card>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginBottom: 20,
  },
  progressFill: {
    width: "10%",
    height: 6,
    backgroundColor: "#8e44ad",
    borderRadius: 3,
  },
  label: {
    marginBottom: 5,
    fontWeight: "500",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  nextButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
