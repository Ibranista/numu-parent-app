import Card from "@/components/Card";
import ProgressBar from "@/components/form/progressBar";
import { createChild } from "@/features/child/thunkApi";
import { selectConcerns } from "@/features/concerns/selector";
import { getConcerns } from "@/features/concerns/thunk.api";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { childSchema } from "@/schema/childSchema";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import Toast from "react-native-toast-message";

export default function App() {
  const dispatch = useAppDispatch();
  const concernData = useAppSelector(selectConcerns);
  const totalSteps = 5;
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
          return false;
        };
        // Render steps
        const renderStep = () => {
          switch (step) {
            case 0:
              return (
                <Card
                  title={"Let&apos;s start with your child&apos;s name."}
                  subTitle={"Tell us about your child."}
                  handleSubmit={undefined}
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
                  {touched.name && errors.name && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                      {errors.name}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={[
                      styles.backBtn,
                      (!values.name || errors.name) && {
                        backgroundColor: "#8d44ada6",
                      },
                    ]}
                    onPress={() => values.name && !errors.name && setStep(1)}
                    disabled={!values.name || !!errors.name}
                  >
                    <Text
                      style={[
                        styles.stepNavActive,
                        (!values.name || errors.name) && {
                          backgroundColor: "transparent",
                        },
                      ]}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                </Card>
              );
            case 1:
              return (
                <Card
                  title="Now, select your child's gender."
                  subTitle="Gender"
                  handleSubmit={undefined}
                >
                  <ProgressBar step={2} totalSteps={5} />
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
                        borderColor:
                          values.gender === "male" ? "#8e44ad" : "#ccc",
                        width: 90,
                        backgroundColor:
                          values.gender === "male" ? "#f7efff" : "#fff",
                      }}
                      onPress={() => setFieldValue("gender", "male")}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          color: values.gender === "male" ? "#8e44ad" : "#999",
                        }}
                      >
                        ♂
                      </Text>
                      <Text style={{ marginTop: 5, fontWeight: "500" }}>
                        Male
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 10,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor:
                          values.gender === "female" ? "#8e44ad" : "#ccc",
                        width: 90,
                        backgroundColor:
                          values.gender === "female" ? "#f7efff" : "#fff",
                      }}
                      onPress={() => setFieldValue("gender", "female")}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          color:
                            values.gender === "female" ? "#8e44ad" : "#999",
                        }}
                      >
                        ♀
                      </Text>
                      <Text style={{ marginTop: 5, fontWeight: "500" }}>
                        Female
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {touched.gender && errors.gender && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                      {errors.gender}
                    </Text>
                  )}
                  <View style={{ height: 10 }} />
                  <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => setStep(0)}
                  >
                    <Text style={styles.stepNavActive}>Prev</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.backBtn,
                      (!values.gender || errors.gender) && {
                        backgroundColor: "#8d44ada6",
                      },
                    ]}
                    onPress={() =>
                      values.gender && !errors.gender && setStep(2)
                    }
                    disabled={!values.gender || !!errors.gender}
                  >
                    <Text
                      style={[
                        styles.stepNavActive,
                        (!values.gender || errors.gender) && {
                          backgroundColor: "transparent",
                        },
                      ]}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                </Card>
              );
            case 2:
              return (
                <Card
                  title="When was your child born?"
                  subTitle="Birth Date"
                  handleSubmit={undefined}
                >
                  <ProgressBar step={3} totalSteps={5} />
                  <StepThreeFormik
                    value={values.birthDate}
                    error={touched.birthDate && errors.birthDate}
                    onChange={(date: string) =>
                      setFieldValue("birthDate", date)
                    }
                  />
                  <View style={{ height: 10 }} />
                  <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => setStep(1)}
                  >
                    <Text style={styles.stepNavActive}>Prev</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.backBtn,
                      (!values.birthDate || errors.birthDate) && {
                        backgroundColor: "#8d44ada6",
                      },
                    ]}
                    onPress={() =>
                      values.birthDate && !errors.birthDate && setStep(3)
                    }
                    disabled={!values.birthDate || !!errors.birthDate}
                  >
                    <Text
                      style={[
                        styles.stepNavActive,
                        (!values.birthDate || errors.birthDate) && {
                          backgroundColor: "transparent",
                        },
                      ]}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                </Card>
              );
            case 3:
              return (
                <Card
                  title="What are your concerns?"
                  subTitle="Select all that apply"
                  handleSubmit={undefined}
                >
                  <ProgressBar step={4} totalSteps={5} />
                  <MultiSelect
                    hideTags
                    items={concernList.map((c: any) => ({
                      id: c.id,
                      name: c.title,
                    }))}
                    uniqueKey="id"
                    onSelectedItemsChange={(items) =>
                      setFieldValue("concern_ids", items)
                    }
                    selectedItems={values.concern_ids}
                    selectText="Select Concerns"
                    searchInputPlaceholderText="Search Concerns..."
                    submitButtonText="Submit"
                    styleDropdownMenuSubsection={{ backgroundColor: "#fff" }}
                    styleMainWrapper={{ backgroundColor: "#fff" }}
                    styleDropdownMenu={{ backgroundColor: "#fff" }}
                    styleTextDropdownSelected={{
                      color: "#8e44ad",
                      fontSize: 16,
                    }}
                    styleTextDropdown={{ color: "#8e44ad", fontSize: 16 }}
                    styleListContainer={{ backgroundColor: "#fff" }}
                    styleRowList={{ backgroundColor: "#fff", borderRadius: 8 }}
                    styleItemsContainer={{ backgroundColor: "#fff" }}
                  />
                  {touched.concern_ids && errors.concern_ids && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                      {errors.concern_ids as string}
                    </Text>
                  )}
                  <View style={{ height: 10 }} />
                  <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => setStep(2)}
                  >
                    <Text style={styles.stepNavActive}>Prev</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.backBtn,
                      (values.concern_ids.length === 0 ||
                        errors.concern_ids) && {
                        backgroundColor: "#8d44ada6",
                      },
                    ]}
                    onPress={() =>
                      values.concern_ids.length > 0 &&
                      !errors.concern_ids &&
                      setStep(4)
                    }
                    disabled={
                      values.concern_ids.length === 0 || !!errors.concern_ids
                    }
                  >
                    <Text
                      style={[
                        styles.stepNavActive,
                        (values.concern_ids.length === 0 ||
                          errors.concern_ids) && {
                          backgroundColor: "transparent",
                        },
                      ]}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                </Card>
              );
            case 4:
              return (
                <Card
                  title="Almost there!"
                  subTitle="Review your child's information before submitting."
                  handleSubmit={handleSubmit}
                  submitText={isSubmitting ? "Submitting..." : "Submit"}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "600",
                      marginBottom: 20,
                    }}
                  >
                    Review &amp; Submit
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    Child&apos;s Name:{" "}
                    <Text style={{ fontWeight: "bold" }}>{values.name}</Text>
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    Gender:{" "}
                    <Text style={{ fontWeight: "bold" }}>{values.gender}</Text>
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    Birth Date:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {values.birthDate}
                    </Text>
                  </Text>
                  <Text style={{ marginBottom: 20 }}>
                    Concerns:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {values.concern_ids
                        .map((id: string) => {
                          const found = concernList.find(
                            (c: any) => c.id === id
                          );
                          return found ? found.title : id;
                        })
                        .join(", ")}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => setStep(3)}
                  >
                    <Text style={styles.stepNavActive}>Back</Text>
                  </TouchableOpacity>
                </Card>
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

function StepThreeFormik({ value, error, onChange }: any) {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginTop: 20,
          marginBottom: 10,
          alignItems: "center",
        }}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: value ? "#222" : "#aaa" }}>
          {value ? new Date(value).toDateString() : "Select birth date"}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={(_e, selectedDate) => {
            setShow(false);
            if (selectedDate)
              onChange(selectedDate.toISOString().split("T")[0]);
          }}
          maximumDate={new Date()}
        />
      )}
      {error && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {error}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  tellUsBtn: {
    marginTop: 20,
    width: "80%",
    backgroundColor: "#8450A0",
    padding: 16,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  welcome: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: "center",
    color: "#1C1520",
  },
  info: {
    textAlign: "center",
    fontSize: 14,
    color: "#545056",
    marginBottom: 20,
  },
  stepNavContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    gap: 12,
  },

  stepNav: {
    fontSize: 18,
    color: "#888",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 4,
    overflow: "hidden",
  },
  backBtn: {
    backgroundColor: "#8e44ad",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  stepNavActive: {
    color: "#fff",
    backgroundColor: "#8e44ad",
    borderColor: "#8e44ad",
  },
});
